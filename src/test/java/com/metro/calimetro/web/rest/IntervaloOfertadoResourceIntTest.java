package com.metro.calimetro.web.rest;

import com.metro.calimetro.CalimetroApp;

import com.metro.calimetro.domain.IntervaloOfertado;
import com.metro.calimetro.repository.IntervaloOfertadoRepository;
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
 * Test class for the IntervaloOfertadoResource REST controller.
 *
 * @see IntervaloOfertadoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CalimetroApp.class)
public class IntervaloOfertadoResourceIntTest {

    private static final ZonedDateTime DEFAULT_HORA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_HORA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final TipoDia DEFAULT_TIPO_DIA = TipoDia.LAB;
    private static final TipoDia UPDATED_TIPO_DIA = TipoDia.VIER;

    private static final Integer DEFAULT_INTERVALO_MAX = 1;
    private static final Integer UPDATED_INTERVALO_MAX = 2;

    private static final Integer DEFAULT_INTERVALO_MIN = 1;
    private static final Integer UPDATED_INTERVALO_MIN = 2;

    @Autowired
    private IntervaloOfertadoRepository intervaloOfertadoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIntervaloOfertadoMockMvc;

    private IntervaloOfertado intervaloOfertado;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IntervaloOfertadoResource intervaloOfertadoResource = new IntervaloOfertadoResource(intervaloOfertadoRepository);
        this.restIntervaloOfertadoMockMvc = MockMvcBuilders.standaloneSetup(intervaloOfertadoResource)
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
    public static IntervaloOfertado createEntity(EntityManager em) {
        IntervaloOfertado intervaloOfertado = new IntervaloOfertado()
            .hora(DEFAULT_HORA)
            .tipoDia(DEFAULT_TIPO_DIA)
            .intervaloMax(DEFAULT_INTERVALO_MAX)
            .intervaloMin(DEFAULT_INTERVALO_MIN);
        return intervaloOfertado;
    }

    @Before
    public void initTest() {
        intervaloOfertado = createEntity(em);
    }

    @Test
    @Transactional
    public void createIntervaloOfertado() throws Exception {
        int databaseSizeBeforeCreate = intervaloOfertadoRepository.findAll().size();

        // Create the IntervaloOfertado
        restIntervaloOfertadoMockMvc.perform(post("/api/intervalo-ofertados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(intervaloOfertado)))
            .andExpect(status().isCreated());

        // Validate the IntervaloOfertado in the database
        List<IntervaloOfertado> intervaloOfertadoList = intervaloOfertadoRepository.findAll();
        assertThat(intervaloOfertadoList).hasSize(databaseSizeBeforeCreate + 1);
        IntervaloOfertado testIntervaloOfertado = intervaloOfertadoList.get(intervaloOfertadoList.size() - 1);
        assertThat(testIntervaloOfertado.getHora()).isEqualTo(DEFAULT_HORA);
        assertThat(testIntervaloOfertado.getTipoDia()).isEqualTo(DEFAULT_TIPO_DIA);
        assertThat(testIntervaloOfertado.getIntervaloMax()).isEqualTo(DEFAULT_INTERVALO_MAX);
        assertThat(testIntervaloOfertado.getIntervaloMin()).isEqualTo(DEFAULT_INTERVALO_MIN);
    }

    @Test
    @Transactional
    public void createIntervaloOfertadoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = intervaloOfertadoRepository.findAll().size();

        // Create the IntervaloOfertado with an existing ID
        intervaloOfertado.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIntervaloOfertadoMockMvc.perform(post("/api/intervalo-ofertados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(intervaloOfertado)))
            .andExpect(status().isBadRequest());

        // Validate the IntervaloOfertado in the database
        List<IntervaloOfertado> intervaloOfertadoList = intervaloOfertadoRepository.findAll();
        assertThat(intervaloOfertadoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIntervaloOfertados() throws Exception {
        // Initialize the database
        intervaloOfertadoRepository.saveAndFlush(intervaloOfertado);

        // Get all the intervaloOfertadoList
        restIntervaloOfertadoMockMvc.perform(get("/api/intervalo-ofertados?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(intervaloOfertado.getId().intValue())))
            .andExpect(jsonPath("$.[*].hora").value(hasItem(sameInstant(DEFAULT_HORA))))
            .andExpect(jsonPath("$.[*].tipoDia").value(hasItem(DEFAULT_TIPO_DIA.toString())))
            .andExpect(jsonPath("$.[*].intervaloMax").value(hasItem(DEFAULT_INTERVALO_MAX)))
            .andExpect(jsonPath("$.[*].intervaloMin").value(hasItem(DEFAULT_INTERVALO_MIN)));
    }

    @Test
    @Transactional
    public void getIntervaloOfertado() throws Exception {
        // Initialize the database
        intervaloOfertadoRepository.saveAndFlush(intervaloOfertado);

        // Get the intervaloOfertado
        restIntervaloOfertadoMockMvc.perform(get("/api/intervalo-ofertados/{id}", intervaloOfertado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(intervaloOfertado.getId().intValue()))
            .andExpect(jsonPath("$.hora").value(sameInstant(DEFAULT_HORA)))
            .andExpect(jsonPath("$.tipoDia").value(DEFAULT_TIPO_DIA.toString()))
            .andExpect(jsonPath("$.intervaloMax").value(DEFAULT_INTERVALO_MAX))
            .andExpect(jsonPath("$.intervaloMin").value(DEFAULT_INTERVALO_MIN));
    }

    @Test
    @Transactional
    public void getNonExistingIntervaloOfertado() throws Exception {
        // Get the intervaloOfertado
        restIntervaloOfertadoMockMvc.perform(get("/api/intervalo-ofertados/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIntervaloOfertado() throws Exception {
        // Initialize the database
        intervaloOfertadoRepository.saveAndFlush(intervaloOfertado);
        int databaseSizeBeforeUpdate = intervaloOfertadoRepository.findAll().size();

        // Update the intervaloOfertado
        IntervaloOfertado updatedIntervaloOfertado = intervaloOfertadoRepository.findOne(intervaloOfertado.getId());
        // Disconnect from session so that the updates on updatedIntervaloOfertado are not directly saved in db
        em.detach(updatedIntervaloOfertado);
        updatedIntervaloOfertado
            .hora(UPDATED_HORA)
            .tipoDia(UPDATED_TIPO_DIA)
            .intervaloMax(UPDATED_INTERVALO_MAX)
            .intervaloMin(UPDATED_INTERVALO_MIN);

        restIntervaloOfertadoMockMvc.perform(put("/api/intervalo-ofertados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIntervaloOfertado)))
            .andExpect(status().isOk());

        // Validate the IntervaloOfertado in the database
        List<IntervaloOfertado> intervaloOfertadoList = intervaloOfertadoRepository.findAll();
        assertThat(intervaloOfertadoList).hasSize(databaseSizeBeforeUpdate);
        IntervaloOfertado testIntervaloOfertado = intervaloOfertadoList.get(intervaloOfertadoList.size() - 1);
        assertThat(testIntervaloOfertado.getHora()).isEqualTo(UPDATED_HORA);
        assertThat(testIntervaloOfertado.getTipoDia()).isEqualTo(UPDATED_TIPO_DIA);
        assertThat(testIntervaloOfertado.getIntervaloMax()).isEqualTo(UPDATED_INTERVALO_MAX);
        assertThat(testIntervaloOfertado.getIntervaloMin()).isEqualTo(UPDATED_INTERVALO_MIN);
    }

    @Test
    @Transactional
    public void updateNonExistingIntervaloOfertado() throws Exception {
        int databaseSizeBeforeUpdate = intervaloOfertadoRepository.findAll().size();

        // Create the IntervaloOfertado

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIntervaloOfertadoMockMvc.perform(put("/api/intervalo-ofertados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(intervaloOfertado)))
            .andExpect(status().isCreated());

        // Validate the IntervaloOfertado in the database
        List<IntervaloOfertado> intervaloOfertadoList = intervaloOfertadoRepository.findAll();
        assertThat(intervaloOfertadoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteIntervaloOfertado() throws Exception {
        // Initialize the database
        intervaloOfertadoRepository.saveAndFlush(intervaloOfertado);
        int databaseSizeBeforeDelete = intervaloOfertadoRepository.findAll().size();

        // Get the intervaloOfertado
        restIntervaloOfertadoMockMvc.perform(delete("/api/intervalo-ofertados/{id}", intervaloOfertado.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IntervaloOfertado> intervaloOfertadoList = intervaloOfertadoRepository.findAll();
        assertThat(intervaloOfertadoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IntervaloOfertado.class);
        IntervaloOfertado intervaloOfertado1 = new IntervaloOfertado();
        intervaloOfertado1.setId(1L);
        IntervaloOfertado intervaloOfertado2 = new IntervaloOfertado();
        intervaloOfertado2.setId(intervaloOfertado1.getId());
        assertThat(intervaloOfertado1).isEqualTo(intervaloOfertado2);
        intervaloOfertado2.setId(2L);
        assertThat(intervaloOfertado1).isNotEqualTo(intervaloOfertado2);
        intervaloOfertado1.setId(null);
        assertThat(intervaloOfertado1).isNotEqualTo(intervaloOfertado2);
    }
}
