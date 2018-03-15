package com.metro.calimetro.web.rest;

import com.metro.calimetro.CalimetroApp;

import com.metro.calimetro.domain.RelacionFechaTipodia;
import com.metro.calimetro.repository.RelacionFechaTipodiaRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.metro.calimetro.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.metro.calimetro.domain.enumeration.TipoDia;
/**
 * Test class for the RelacionFechaTipodiaResource REST controller.
 *
 * @see RelacionFechaTipodiaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CalimetroApp.class)
public class RelacionFechaTipodiaResourceIntTest {

    private static final TipoDia DEFAULT_TIPO_DIA = TipoDia.LAB;
    private static final TipoDia UPDATED_TIPO_DIA = TipoDia.VIER;

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private RelacionFechaTipodiaRepository relacionFechaTipodiaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRelacionFechaTipodiaMockMvc;

    private RelacionFechaTipodia relacionFechaTipodia;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RelacionFechaTipodiaResource relacionFechaTipodiaResource = new RelacionFechaTipodiaResource(relacionFechaTipodiaRepository);
        this.restRelacionFechaTipodiaMockMvc = MockMvcBuilders.standaloneSetup(relacionFechaTipodiaResource)
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
    public static RelacionFechaTipodia createEntity(EntityManager em) {
        RelacionFechaTipodia relacionFechaTipodia = new RelacionFechaTipodia()
            .tipoDia(DEFAULT_TIPO_DIA)
            .fecha(DEFAULT_FECHA);
        return relacionFechaTipodia;
    }

    @Before
    public void initTest() {
        relacionFechaTipodia = createEntity(em);
    }

    @Test
    @Transactional
    public void createRelacionFechaTipodia() throws Exception {
        int databaseSizeBeforeCreate = relacionFechaTipodiaRepository.findAll().size();

        // Create the RelacionFechaTipodia
        restRelacionFechaTipodiaMockMvc.perform(post("/api/relacion-fecha-tipodias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(relacionFechaTipodia)))
            .andExpect(status().isCreated());

        // Validate the RelacionFechaTipodia in the database
        List<RelacionFechaTipodia> relacionFechaTipodiaList = relacionFechaTipodiaRepository.findAll();
        assertThat(relacionFechaTipodiaList).hasSize(databaseSizeBeforeCreate + 1);
        RelacionFechaTipodia testRelacionFechaTipodia = relacionFechaTipodiaList.get(relacionFechaTipodiaList.size() - 1);
        assertThat(testRelacionFechaTipodia.getTipoDia()).isEqualTo(DEFAULT_TIPO_DIA);
        assertThat(testRelacionFechaTipodia.getFecha()).isEqualTo(DEFAULT_FECHA);
    }

    @Test
    @Transactional
    public void createRelacionFechaTipodiaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = relacionFechaTipodiaRepository.findAll().size();

        // Create the RelacionFechaTipodia with an existing ID
        relacionFechaTipodia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRelacionFechaTipodiaMockMvc.perform(post("/api/relacion-fecha-tipodias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(relacionFechaTipodia)))
            .andExpect(status().isBadRequest());

        // Validate the RelacionFechaTipodia in the database
        List<RelacionFechaTipodia> relacionFechaTipodiaList = relacionFechaTipodiaRepository.findAll();
        assertThat(relacionFechaTipodiaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaIsRequired() throws Exception {
        int databaseSizeBeforeTest = relacionFechaTipodiaRepository.findAll().size();
        // set the field null
        relacionFechaTipodia.setFecha(null);

        // Create the RelacionFechaTipodia, which fails.

        restRelacionFechaTipodiaMockMvc.perform(post("/api/relacion-fecha-tipodias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(relacionFechaTipodia)))
            .andExpect(status().isBadRequest());

        List<RelacionFechaTipodia> relacionFechaTipodiaList = relacionFechaTipodiaRepository.findAll();
        assertThat(relacionFechaTipodiaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRelacionFechaTipodias() throws Exception {
        // Initialize the database
        relacionFechaTipodiaRepository.saveAndFlush(relacionFechaTipodia);

        // Get all the relacionFechaTipodiaList
        restRelacionFechaTipodiaMockMvc.perform(get("/api/relacion-fecha-tipodias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(relacionFechaTipodia.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipoDia").value(hasItem(DEFAULT_TIPO_DIA.toString())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())));
    }

    @Test
    @Transactional
    public void getRelacionFechaTipodia() throws Exception {
        // Initialize the database
        relacionFechaTipodiaRepository.saveAndFlush(relacionFechaTipodia);

        // Get the relacionFechaTipodia
        restRelacionFechaTipodiaMockMvc.perform(get("/api/relacion-fecha-tipodias/{id}", relacionFechaTipodia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(relacionFechaTipodia.getId().intValue()))
            .andExpect(jsonPath("$.tipoDia").value(DEFAULT_TIPO_DIA.toString()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRelacionFechaTipodia() throws Exception {
        // Get the relacionFechaTipodia
        restRelacionFechaTipodiaMockMvc.perform(get("/api/relacion-fecha-tipodias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRelacionFechaTipodia() throws Exception {
        // Initialize the database
        relacionFechaTipodiaRepository.saveAndFlush(relacionFechaTipodia);
        int databaseSizeBeforeUpdate = relacionFechaTipodiaRepository.findAll().size();

        // Update the relacionFechaTipodia
        RelacionFechaTipodia updatedRelacionFechaTipodia = relacionFechaTipodiaRepository.findOne(relacionFechaTipodia.getId());
        // Disconnect from session so that the updates on updatedRelacionFechaTipodia are not directly saved in db
        em.detach(updatedRelacionFechaTipodia);
        updatedRelacionFechaTipodia
            .tipoDia(UPDATED_TIPO_DIA)
            .fecha(UPDATED_FECHA);

        restRelacionFechaTipodiaMockMvc.perform(put("/api/relacion-fecha-tipodias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRelacionFechaTipodia)))
            .andExpect(status().isOk());

        // Validate the RelacionFechaTipodia in the database
        List<RelacionFechaTipodia> relacionFechaTipodiaList = relacionFechaTipodiaRepository.findAll();
        assertThat(relacionFechaTipodiaList).hasSize(databaseSizeBeforeUpdate);
        RelacionFechaTipodia testRelacionFechaTipodia = relacionFechaTipodiaList.get(relacionFechaTipodiaList.size() - 1);
        assertThat(testRelacionFechaTipodia.getTipoDia()).isEqualTo(UPDATED_TIPO_DIA);
        assertThat(testRelacionFechaTipodia.getFecha()).isEqualTo(UPDATED_FECHA);
    }

    @Test
    @Transactional
    public void updateNonExistingRelacionFechaTipodia() throws Exception {
        int databaseSizeBeforeUpdate = relacionFechaTipodiaRepository.findAll().size();

        // Create the RelacionFechaTipodia

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRelacionFechaTipodiaMockMvc.perform(put("/api/relacion-fecha-tipodias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(relacionFechaTipodia)))
            .andExpect(status().isCreated());

        // Validate the RelacionFechaTipodia in the database
        List<RelacionFechaTipodia> relacionFechaTipodiaList = relacionFechaTipodiaRepository.findAll();
        assertThat(relacionFechaTipodiaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRelacionFechaTipodia() throws Exception {
        // Initialize the database
        relacionFechaTipodiaRepository.saveAndFlush(relacionFechaTipodia);
        int databaseSizeBeforeDelete = relacionFechaTipodiaRepository.findAll().size();

        // Get the relacionFechaTipodia
        restRelacionFechaTipodiaMockMvc.perform(delete("/api/relacion-fecha-tipodias/{id}", relacionFechaTipodia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RelacionFechaTipodia> relacionFechaTipodiaList = relacionFechaTipodiaRepository.findAll();
        assertThat(relacionFechaTipodiaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RelacionFechaTipodia.class);
        RelacionFechaTipodia relacionFechaTipodia1 = new RelacionFechaTipodia();
        relacionFechaTipodia1.setId(1L);
        RelacionFechaTipodia relacionFechaTipodia2 = new RelacionFechaTipodia();
        relacionFechaTipodia2.setId(relacionFechaTipodia1.getId());
        assertThat(relacionFechaTipodia1).isEqualTo(relacionFechaTipodia2);
        relacionFechaTipodia2.setId(2L);
        assertThat(relacionFechaTipodia1).isNotEqualTo(relacionFechaTipodia2);
        relacionFechaTipodia1.setId(null);
        assertThat(relacionFechaTipodia1).isNotEqualTo(relacionFechaTipodia2);
    }
}
