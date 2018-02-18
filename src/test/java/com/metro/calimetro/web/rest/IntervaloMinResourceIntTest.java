package com.metro.calimetro.web.rest;

import com.metro.calimetro.CalimetroApp;

import com.metro.calimetro.domain.IntervaloMin;
import com.metro.calimetro.repository.IntervaloMinRepository;
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

import com.metro.calimetro.domain.enumeration.TipoVia;
/**
 * Test class for the IntervaloMinResource REST controller.
 *
 * @see IntervaloMinResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CalimetroApp.class)
public class IntervaloMinResourceIntTest {

    private static final ZonedDateTime DEFAULT_HORA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_HORA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Integer DEFAULT_INTER_MIN = 1;
    private static final Integer UPDATED_INTER_MIN = 2;

    private static final String DEFAULT_ESTACION_MIN = "AAAAA";
    private static final String UPDATED_ESTACION_MIN = "BBBBB";

    private static final TipoVia DEFAULT_VIA_MIN = TipoVia.I;
    private static final TipoVia UPDATED_VIA_MIN = TipoVia.II;

    @Autowired
    private IntervaloMinRepository intervaloMinRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIntervaloMinMockMvc;

    private IntervaloMin intervaloMin;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IntervaloMinResource intervaloMinResource = new IntervaloMinResource(intervaloMinRepository);
        this.restIntervaloMinMockMvc = MockMvcBuilders.standaloneSetup(intervaloMinResource)
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
    public static IntervaloMin createEntity(EntityManager em) {
        IntervaloMin intervaloMin = new IntervaloMin()
            .hora(DEFAULT_HORA)
            .interMin(DEFAULT_INTER_MIN)
            .estacionMin(DEFAULT_ESTACION_MIN)
            .viaMin(DEFAULT_VIA_MIN);
        return intervaloMin;
    }

    @Before
    public void initTest() {
        intervaloMin = createEntity(em);
    }

    @Test
    @Transactional
    public void createIntervaloMin() throws Exception {
        int databaseSizeBeforeCreate = intervaloMinRepository.findAll().size();

        // Create the IntervaloMin
        restIntervaloMinMockMvc.perform(post("/api/intervalo-mins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(intervaloMin)))
            .andExpect(status().isCreated());

        // Validate the IntervaloMin in the database
        List<IntervaloMin> intervaloMinList = intervaloMinRepository.findAll();
        assertThat(intervaloMinList).hasSize(databaseSizeBeforeCreate + 1);
        IntervaloMin testIntervaloMin = intervaloMinList.get(intervaloMinList.size() - 1);
        assertThat(testIntervaloMin.getHora()).isEqualTo(DEFAULT_HORA);
        assertThat(testIntervaloMin.getInterMin()).isEqualTo(DEFAULT_INTER_MIN);
        assertThat(testIntervaloMin.getEstacionMin()).isEqualTo(DEFAULT_ESTACION_MIN);
        assertThat(testIntervaloMin.getViaMin()).isEqualTo(DEFAULT_VIA_MIN);
    }

    @Test
    @Transactional
    public void createIntervaloMinWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = intervaloMinRepository.findAll().size();

        // Create the IntervaloMin with an existing ID
        intervaloMin.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIntervaloMinMockMvc.perform(post("/api/intervalo-mins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(intervaloMin)))
            .andExpect(status().isBadRequest());

        // Validate the IntervaloMin in the database
        List<IntervaloMin> intervaloMinList = intervaloMinRepository.findAll();
        assertThat(intervaloMinList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIntervaloMins() throws Exception {
        // Initialize the database
        intervaloMinRepository.saveAndFlush(intervaloMin);

        // Get all the intervaloMinList
        restIntervaloMinMockMvc.perform(get("/api/intervalo-mins?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(intervaloMin.getId().intValue())))
            .andExpect(jsonPath("$.[*].hora").value(hasItem(sameInstant(DEFAULT_HORA))))
            .andExpect(jsonPath("$.[*].interMin").value(hasItem(DEFAULT_INTER_MIN)))
            .andExpect(jsonPath("$.[*].estacionMin").value(hasItem(DEFAULT_ESTACION_MIN.toString())))
            .andExpect(jsonPath("$.[*].viaMin").value(hasItem(DEFAULT_VIA_MIN.toString())));
    }

    @Test
    @Transactional
    public void getIntervaloMin() throws Exception {
        // Initialize the database
        intervaloMinRepository.saveAndFlush(intervaloMin);

        // Get the intervaloMin
        restIntervaloMinMockMvc.perform(get("/api/intervalo-mins/{id}", intervaloMin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(intervaloMin.getId().intValue()))
            .andExpect(jsonPath("$.hora").value(sameInstant(DEFAULT_HORA)))
            .andExpect(jsonPath("$.interMin").value(DEFAULT_INTER_MIN))
            .andExpect(jsonPath("$.estacionMin").value(DEFAULT_ESTACION_MIN.toString()))
            .andExpect(jsonPath("$.viaMin").value(DEFAULT_VIA_MIN.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingIntervaloMin() throws Exception {
        // Get the intervaloMin
        restIntervaloMinMockMvc.perform(get("/api/intervalo-mins/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIntervaloMin() throws Exception {
        // Initialize the database
        intervaloMinRepository.saveAndFlush(intervaloMin);
        int databaseSizeBeforeUpdate = intervaloMinRepository.findAll().size();

        // Update the intervaloMin
        IntervaloMin updatedIntervaloMin = intervaloMinRepository.findOne(intervaloMin.getId());
        // Disconnect from session so that the updates on updatedIntervaloMin are not directly saved in db
        em.detach(updatedIntervaloMin);
        updatedIntervaloMin
            .hora(UPDATED_HORA)
            .interMin(UPDATED_INTER_MIN)
            .estacionMin(UPDATED_ESTACION_MIN)
            .viaMin(UPDATED_VIA_MIN);

        restIntervaloMinMockMvc.perform(put("/api/intervalo-mins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIntervaloMin)))
            .andExpect(status().isOk());

        // Validate the IntervaloMin in the database
        List<IntervaloMin> intervaloMinList = intervaloMinRepository.findAll();
        assertThat(intervaloMinList).hasSize(databaseSizeBeforeUpdate);
        IntervaloMin testIntervaloMin = intervaloMinList.get(intervaloMinList.size() - 1);
        assertThat(testIntervaloMin.getHora()).isEqualTo(UPDATED_HORA);
        assertThat(testIntervaloMin.getInterMin()).isEqualTo(UPDATED_INTER_MIN);
        assertThat(testIntervaloMin.getEstacionMin()).isEqualTo(UPDATED_ESTACION_MIN);
        assertThat(testIntervaloMin.getViaMin()).isEqualTo(UPDATED_VIA_MIN);
    }

    @Test
    @Transactional
    public void updateNonExistingIntervaloMin() throws Exception {
        int databaseSizeBeforeUpdate = intervaloMinRepository.findAll().size();

        // Create the IntervaloMin

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIntervaloMinMockMvc.perform(put("/api/intervalo-mins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(intervaloMin)))
            .andExpect(status().isCreated());

        // Validate the IntervaloMin in the database
        List<IntervaloMin> intervaloMinList = intervaloMinRepository.findAll();
        assertThat(intervaloMinList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteIntervaloMin() throws Exception {
        // Initialize the database
        intervaloMinRepository.saveAndFlush(intervaloMin);
        int databaseSizeBeforeDelete = intervaloMinRepository.findAll().size();

        // Get the intervaloMin
        restIntervaloMinMockMvc.perform(delete("/api/intervalo-mins/{id}", intervaloMin.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IntervaloMin> intervaloMinList = intervaloMinRepository.findAll();
        assertThat(intervaloMinList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IntervaloMin.class);
        IntervaloMin intervaloMin1 = new IntervaloMin();
        intervaloMin1.setId(1L);
        IntervaloMin intervaloMin2 = new IntervaloMin();
        intervaloMin2.setId(intervaloMin1.getId());
        assertThat(intervaloMin1).isEqualTo(intervaloMin2);
        intervaloMin2.setId(2L);
        assertThat(intervaloMin1).isNotEqualTo(intervaloMin2);
        intervaloMin1.setId(null);
        assertThat(intervaloMin1).isNotEqualTo(intervaloMin2);
    }
}
