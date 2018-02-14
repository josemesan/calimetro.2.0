package com.metro.calimetro.web.rest;

import com.metro.calimetro.CalimetroApp;

import com.metro.calimetro.domain.TablaTrenes;
import com.metro.calimetro.repository.TablaTrenesRepository;
import com.metro.calimetro.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.metro.calimetro.web.rest.TestUtil.sameInstant;
import static com.metro.calimetro.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.metro.calimetro.domain.enumeration.TipoDia;
/**
 * Test class for the TablaTrenesResource REST controller.
 *
 * @see TablaTrenesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CalimetroApp.class)
public class TablaTrenesResourceIntTest {

    private static final ZonedDateTime DEFAULT_HORA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_HORA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final TipoDia DEFAULT_TIPO_DIA = TipoDia.LAB;
    private static final TipoDia UPDATED_TIPO_DIA = TipoDia.VIER;

    private static final Integer DEFAULT_NUMERO_TRENES = 1;
    private static final Integer UPDATED_NUMERO_TRENES = 2;

    @Autowired
    private TablaTrenesRepository tablaTrenesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTablaTrenesMockMvc;

    private TablaTrenes tablaTrenes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TablaTrenesResource tablaTrenesResource = new TablaTrenesResource(tablaTrenesRepository);
        this.restTablaTrenesMockMvc = MockMvcBuilders.standaloneSetup(tablaTrenesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TablaTrenes createEntity(EntityManager em) {
        TablaTrenes tablaTrenes = new TablaTrenes()
            .hora(DEFAULT_HORA)
            .tipoDia(DEFAULT_TIPO_DIA)
            .numeroTrenes(DEFAULT_NUMERO_TRENES);
        return tablaTrenes;
    }

    @Before
    public void initTest() {
        tablaTrenes = createEntity(em);
    }

    @Test
    @Transactional
    public void createTablaTrenes() throws Exception {
        int databaseSizeBeforeCreate = tablaTrenesRepository.findAll().size();

        // Create the TablaTrenes
        restTablaTrenesMockMvc.perform(post("/api/tabla-trenes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tablaTrenes)))
            .andExpect(status().isCreated());

        // Validate the TablaTrenes in the database
        List<TablaTrenes> tablaTrenesList = tablaTrenesRepository.findAll();
        assertThat(tablaTrenesList).hasSize(databaseSizeBeforeCreate + 1);
        TablaTrenes testTablaTrenes = tablaTrenesList.get(tablaTrenesList.size() - 1);
        assertThat(testTablaTrenes.getHora()).isEqualTo(DEFAULT_HORA);
        assertThat(testTablaTrenes.getTipoDia()).isEqualTo(DEFAULT_TIPO_DIA);
        assertThat(testTablaTrenes.getNumeroTrenes()).isEqualTo(DEFAULT_NUMERO_TRENES);
    }

    @Test
    @Transactional
    public void createTablaTrenesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tablaTrenesRepository.findAll().size();

        // Create the TablaTrenes with an existing ID
        tablaTrenes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTablaTrenesMockMvc.perform(post("/api/tabla-trenes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tablaTrenes)))
            .andExpect(status().isBadRequest());

        // Validate the TablaTrenes in the database
        List<TablaTrenes> tablaTrenesList = tablaTrenesRepository.findAll();
        assertThat(tablaTrenesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTablaTrenes() throws Exception {
        // Initialize the database
        tablaTrenesRepository.saveAndFlush(tablaTrenes);

        // Get all the tablaTrenesList
        restTablaTrenesMockMvc.perform(get("/api/tabla-trenes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tablaTrenes.getId().intValue())))
            .andExpect(jsonPath("$.[*].hora").value(hasItem(sameInstant(DEFAULT_HORA))))
            .andExpect(jsonPath("$.[*].tipoDia").value(hasItem(DEFAULT_TIPO_DIA.toString())))
            .andExpect(jsonPath("$.[*].numeroTrenes").value(hasItem(DEFAULT_NUMERO_TRENES)));
    }

    @Test
    @Transactional
    public void getTablaTrenes() throws Exception {
        // Initialize the database
        tablaTrenesRepository.saveAndFlush(tablaTrenes);

        // Get the tablaTrenes
        restTablaTrenesMockMvc.perform(get("/api/tabla-trenes/{id}", tablaTrenes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tablaTrenes.getId().intValue()))
            .andExpect(jsonPath("$.hora").value(sameInstant(DEFAULT_HORA)))
            .andExpect(jsonPath("$.tipoDia").value(DEFAULT_TIPO_DIA.toString()))
            .andExpect(jsonPath("$.numeroTrenes").value(DEFAULT_NUMERO_TRENES));
    }

    @Test
    @Transactional
    public void getNonExistingTablaTrenes() throws Exception {
        // Get the tablaTrenes
        restTablaTrenesMockMvc.perform(get("/api/tabla-trenes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTablaTrenes() throws Exception {
        // Initialize the database
        tablaTrenesRepository.saveAndFlush(tablaTrenes);
        int databaseSizeBeforeUpdate = tablaTrenesRepository.findAll().size();

        // Update the tablaTrenes
        TablaTrenes updatedTablaTrenes = tablaTrenesRepository.findOne(tablaTrenes.getId());
        // Disconnect from session so that the updates on updatedTablaTrenes are not directly saved in db
        em.detach(updatedTablaTrenes);
        updatedTablaTrenes
            .hora(UPDATED_HORA)
            .tipoDia(UPDATED_TIPO_DIA)
            .numeroTrenes(UPDATED_NUMERO_TRENES);

        restTablaTrenesMockMvc.perform(put("/api/tabla-trenes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTablaTrenes)))
            .andExpect(status().isOk());

        // Validate the TablaTrenes in the database
        List<TablaTrenes> tablaTrenesList = tablaTrenesRepository.findAll();
        assertThat(tablaTrenesList).hasSize(databaseSizeBeforeUpdate);
        TablaTrenes testTablaTrenes = tablaTrenesList.get(tablaTrenesList.size() - 1);
        assertThat(testTablaTrenes.getHora()).isEqualTo(UPDATED_HORA);
        assertThat(testTablaTrenes.getTipoDia()).isEqualTo(UPDATED_TIPO_DIA);
        assertThat(testTablaTrenes.getNumeroTrenes()).isEqualTo(UPDATED_NUMERO_TRENES);
    }

    @Test
    @Transactional
    public void updateNonExistingTablaTrenes() throws Exception {
        int databaseSizeBeforeUpdate = tablaTrenesRepository.findAll().size();

        // Create the TablaTrenes

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTablaTrenesMockMvc.perform(put("/api/tabla-trenes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tablaTrenes)))
            .andExpect(status().isCreated());

        // Validate the TablaTrenes in the database
        List<TablaTrenes> tablaTrenesList = tablaTrenesRepository.findAll();
        assertThat(tablaTrenesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTablaTrenes() throws Exception {
        // Initialize the database
        tablaTrenesRepository.saveAndFlush(tablaTrenes);
        int databaseSizeBeforeDelete = tablaTrenesRepository.findAll().size();

        // Get the tablaTrenes
        restTablaTrenesMockMvc.perform(delete("/api/tabla-trenes/{id}", tablaTrenes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TablaTrenes> tablaTrenesList = tablaTrenesRepository.findAll();
        assertThat(tablaTrenesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TablaTrenes.class);
        TablaTrenes tablaTrenes1 = new TablaTrenes();
        tablaTrenes1.setId(1L);
        TablaTrenes tablaTrenes2 = new TablaTrenes();
        tablaTrenes2.setId(tablaTrenes1.getId());
        assertThat(tablaTrenes1).isEqualTo(tablaTrenes2);
        tablaTrenes2.setId(2L);
        assertThat(tablaTrenes1).isNotEqualTo(tablaTrenes2);
        tablaTrenes1.setId(null);
        assertThat(tablaTrenes1).isNotEqualTo(tablaTrenes2);
    }
}
