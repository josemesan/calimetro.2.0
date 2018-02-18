package com.metro.calimetro.web.rest;

import com.metro.calimetro.CalimetroApp;

import com.metro.calimetro.domain.IntervaloMax;
import com.metro.calimetro.repository.IntervaloMaxRepository;
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
 * Test class for the IntervaloMaxResource REST controller.
 *
 * @see IntervaloMaxResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CalimetroApp.class)
public class IntervaloMaxResourceIntTest {

    private static final ZonedDateTime DEFAULT_HORA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_HORA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Integer DEFAULT_INTER_MAX = 1;
    private static final Integer UPDATED_INTER_MAX = 2;

    private static final String DEFAULT_ESTACION_MAX = "AAAAA";
    private static final String UPDATED_ESTACION_MAX = "BBBBB";

    private static final TipoVia DEFAULT_VIAMAX = TipoVia.I;
    private static final TipoVia UPDATED_VIAMAX = TipoVia.II;

    @Autowired
    private IntervaloMaxRepository intervaloMaxRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIntervaloMaxMockMvc;

    private IntervaloMax intervaloMax;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IntervaloMaxResource intervaloMaxResource = new IntervaloMaxResource(intervaloMaxRepository);
        this.restIntervaloMaxMockMvc = MockMvcBuilders.standaloneSetup(intervaloMaxResource)
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
    public static IntervaloMax createEntity(EntityManager em) {
        IntervaloMax intervaloMax = new IntervaloMax()
            .hora(DEFAULT_HORA)
            .interMax(DEFAULT_INTER_MAX)
            .estacionMax(DEFAULT_ESTACION_MAX)
            .viamax(DEFAULT_VIAMAX);
        return intervaloMax;
    }

    @Before
    public void initTest() {
        intervaloMax = createEntity(em);
    }

    @Test
    @Transactional
    public void createIntervaloMax() throws Exception {
        int databaseSizeBeforeCreate = intervaloMaxRepository.findAll().size();

        // Create the IntervaloMax
        restIntervaloMaxMockMvc.perform(post("/api/intervalo-maxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(intervaloMax)))
            .andExpect(status().isCreated());

        // Validate the IntervaloMax in the database
        List<IntervaloMax> intervaloMaxList = intervaloMaxRepository.findAll();
        assertThat(intervaloMaxList).hasSize(databaseSizeBeforeCreate + 1);
        IntervaloMax testIntervaloMax = intervaloMaxList.get(intervaloMaxList.size() - 1);
        assertThat(testIntervaloMax.getHora()).isEqualTo(DEFAULT_HORA);
        assertThat(testIntervaloMax.getInterMax()).isEqualTo(DEFAULT_INTER_MAX);
        assertThat(testIntervaloMax.getEstacionMax()).isEqualTo(DEFAULT_ESTACION_MAX);
        assertThat(testIntervaloMax.getViamax()).isEqualTo(DEFAULT_VIAMAX);
    }

    @Test
    @Transactional
    public void createIntervaloMaxWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = intervaloMaxRepository.findAll().size();

        // Create the IntervaloMax with an existing ID
        intervaloMax.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIntervaloMaxMockMvc.perform(post("/api/intervalo-maxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(intervaloMax)))
            .andExpect(status().isBadRequest());

        // Validate the IntervaloMax in the database
        List<IntervaloMax> intervaloMaxList = intervaloMaxRepository.findAll();
        assertThat(intervaloMaxList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIntervaloMaxes() throws Exception {
        // Initialize the database
        intervaloMaxRepository.saveAndFlush(intervaloMax);

        // Get all the intervaloMaxList
        restIntervaloMaxMockMvc.perform(get("/api/intervalo-maxes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(intervaloMax.getId().intValue())))
            .andExpect(jsonPath("$.[*].hora").value(hasItem(sameInstant(DEFAULT_HORA))))
            .andExpect(jsonPath("$.[*].interMax").value(hasItem(DEFAULT_INTER_MAX)))
            .andExpect(jsonPath("$.[*].estacionMax").value(hasItem(DEFAULT_ESTACION_MAX.toString())))
            .andExpect(jsonPath("$.[*].viamax").value(hasItem(DEFAULT_VIAMAX.toString())));
    }

    @Test
    @Transactional
    public void getIntervaloMax() throws Exception {
        // Initialize the database
        intervaloMaxRepository.saveAndFlush(intervaloMax);

        // Get the intervaloMax
        restIntervaloMaxMockMvc.perform(get("/api/intervalo-maxes/{id}", intervaloMax.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(intervaloMax.getId().intValue()))
            .andExpect(jsonPath("$.hora").value(sameInstant(DEFAULT_HORA)))
            .andExpect(jsonPath("$.interMax").value(DEFAULT_INTER_MAX))
            .andExpect(jsonPath("$.estacionMax").value(DEFAULT_ESTACION_MAX.toString()))
            .andExpect(jsonPath("$.viamax").value(DEFAULT_VIAMAX.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingIntervaloMax() throws Exception {
        // Get the intervaloMax
        restIntervaloMaxMockMvc.perform(get("/api/intervalo-maxes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIntervaloMax() throws Exception {
        // Initialize the database
        intervaloMaxRepository.saveAndFlush(intervaloMax);
        int databaseSizeBeforeUpdate = intervaloMaxRepository.findAll().size();

        // Update the intervaloMax
        IntervaloMax updatedIntervaloMax = intervaloMaxRepository.findOne(intervaloMax.getId());
        // Disconnect from session so that the updates on updatedIntervaloMax are not directly saved in db
        em.detach(updatedIntervaloMax);
        updatedIntervaloMax
            .hora(UPDATED_HORA)
            .interMax(UPDATED_INTER_MAX)
            .estacionMax(UPDATED_ESTACION_MAX)
            .viamax(UPDATED_VIAMAX);

        restIntervaloMaxMockMvc.perform(put("/api/intervalo-maxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIntervaloMax)))
            .andExpect(status().isOk());

        // Validate the IntervaloMax in the database
        List<IntervaloMax> intervaloMaxList = intervaloMaxRepository.findAll();
        assertThat(intervaloMaxList).hasSize(databaseSizeBeforeUpdate);
        IntervaloMax testIntervaloMax = intervaloMaxList.get(intervaloMaxList.size() - 1);
        assertThat(testIntervaloMax.getHora()).isEqualTo(UPDATED_HORA);
        assertThat(testIntervaloMax.getInterMax()).isEqualTo(UPDATED_INTER_MAX);
        assertThat(testIntervaloMax.getEstacionMax()).isEqualTo(UPDATED_ESTACION_MAX);
        assertThat(testIntervaloMax.getViamax()).isEqualTo(UPDATED_VIAMAX);
    }

    @Test
    @Transactional
    public void updateNonExistingIntervaloMax() throws Exception {
        int databaseSizeBeforeUpdate = intervaloMaxRepository.findAll().size();

        // Create the IntervaloMax

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIntervaloMaxMockMvc.perform(put("/api/intervalo-maxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(intervaloMax)))
            .andExpect(status().isCreated());

        // Validate the IntervaloMax in the database
        List<IntervaloMax> intervaloMaxList = intervaloMaxRepository.findAll();
        assertThat(intervaloMaxList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteIntervaloMax() throws Exception {
        // Initialize the database
        intervaloMaxRepository.saveAndFlush(intervaloMax);
        int databaseSizeBeforeDelete = intervaloMaxRepository.findAll().size();

        // Get the intervaloMax
        restIntervaloMaxMockMvc.perform(delete("/api/intervalo-maxes/{id}", intervaloMax.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IntervaloMax> intervaloMaxList = intervaloMaxRepository.findAll();
        assertThat(intervaloMaxList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IntervaloMax.class);
        IntervaloMax intervaloMax1 = new IntervaloMax();
        intervaloMax1.setId(1L);
        IntervaloMax intervaloMax2 = new IntervaloMax();
        intervaloMax2.setId(intervaloMax1.getId());
        assertThat(intervaloMax1).isEqualTo(intervaloMax2);
        intervaloMax2.setId(2L);
        assertThat(intervaloMax1).isNotEqualTo(intervaloMax2);
        intervaloMax1.setId(null);
        assertThat(intervaloMax1).isNotEqualTo(intervaloMax2);
    }
}
