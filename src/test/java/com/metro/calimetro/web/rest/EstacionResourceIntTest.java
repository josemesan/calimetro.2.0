package com.metro.calimetro.web.rest;

import com.metro.calimetro.CalimetroApp;

import com.metro.calimetro.domain.Estacion;
import com.metro.calimetro.repository.EstacionRepository;
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
import java.util.List;

import static com.metro.calimetro.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.metro.calimetro.domain.enumeration.TipoVia;
/**
 * Test class for the EstacionResource REST controller.
 *
 * @see EstacionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CalimetroApp.class)
public class EstacionResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_NEMO = "AAAAA";
    private static final String UPDATED_NEMO = "BBBBB";

    private static final TipoVia DEFAULT_VIA = TipoVia.I;
    private static final TipoVia UPDATED_VIA = TipoVia.II;

    private static final Boolean DEFAULT_VISIBLE = false;
    private static final Boolean UPDATED_VISIBLE = true;

    @Autowired
    private EstacionRepository estacionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEstacionMockMvc;

    private Estacion estacion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EstacionResource estacionResource = new EstacionResource(estacionRepository);
        this.restEstacionMockMvc = MockMvcBuilders.standaloneSetup(estacionResource)
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
    public static Estacion createEntity(EntityManager em) {
        Estacion estacion = new Estacion()
            .nombre(DEFAULT_NOMBRE)
            .nemo(DEFAULT_NEMO)
            .via(DEFAULT_VIA)
            .visible(DEFAULT_VISIBLE);
        return estacion;
    }

    @Before
    public void initTest() {
        estacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstacion() throws Exception {
        int databaseSizeBeforeCreate = estacionRepository.findAll().size();

        // Create the Estacion
        restEstacionMockMvc.perform(post("/api/estacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estacion)))
            .andExpect(status().isCreated());

        // Validate the Estacion in the database
        List<Estacion> estacionList = estacionRepository.findAll();
        assertThat(estacionList).hasSize(databaseSizeBeforeCreate + 1);
        Estacion testEstacion = estacionList.get(estacionList.size() - 1);
        assertThat(testEstacion.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testEstacion.getNemo()).isEqualTo(DEFAULT_NEMO);
        assertThat(testEstacion.getVia()).isEqualTo(DEFAULT_VIA);
        assertThat(testEstacion.isVisible()).isEqualTo(DEFAULT_VISIBLE);
    }

    @Test
    @Transactional
    public void createEstacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estacionRepository.findAll().size();

        // Create the Estacion with an existing ID
        estacion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstacionMockMvc.perform(post("/api/estacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estacion)))
            .andExpect(status().isBadRequest());

        // Validate the Estacion in the database
        List<Estacion> estacionList = estacionRepository.findAll();
        assertThat(estacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEstacions() throws Exception {
        // Initialize the database
        estacionRepository.saveAndFlush(estacion);

        // Get all the estacionList
        restEstacionMockMvc.perform(get("/api/estacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].nemo").value(hasItem(DEFAULT_NEMO.toString())))
            .andExpect(jsonPath("$.[*].via").value(hasItem(DEFAULT_VIA.toString())))
            .andExpect(jsonPath("$.[*].visible").value(hasItem(DEFAULT_VISIBLE.booleanValue())));
    }

    @Test
    @Transactional
    public void getEstacion() throws Exception {
        // Initialize the database
        estacionRepository.saveAndFlush(estacion);

        // Get the estacion
        restEstacionMockMvc.perform(get("/api/estacions/{id}", estacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(estacion.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.nemo").value(DEFAULT_NEMO.toString()))
            .andExpect(jsonPath("$.via").value(DEFAULT_VIA.toString()))
            .andExpect(jsonPath("$.visible").value(DEFAULT_VISIBLE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEstacion() throws Exception {
        // Get the estacion
        restEstacionMockMvc.perform(get("/api/estacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstacion() throws Exception {
        // Initialize the database
        estacionRepository.saveAndFlush(estacion);
        int databaseSizeBeforeUpdate = estacionRepository.findAll().size();

        // Update the estacion
        Estacion updatedEstacion = estacionRepository.findOne(estacion.getId());
        // Disconnect from session so that the updates on updatedEstacion are not directly saved in db
        em.detach(updatedEstacion);
        updatedEstacion
            .nombre(UPDATED_NOMBRE)
            .nemo(UPDATED_NEMO)
            .via(UPDATED_VIA)
            .visible(UPDATED_VISIBLE);

        restEstacionMockMvc.perform(put("/api/estacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstacion)))
            .andExpect(status().isOk());

        // Validate the Estacion in the database
        List<Estacion> estacionList = estacionRepository.findAll();
        assertThat(estacionList).hasSize(databaseSizeBeforeUpdate);
        Estacion testEstacion = estacionList.get(estacionList.size() - 1);
        assertThat(testEstacion.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testEstacion.getNemo()).isEqualTo(UPDATED_NEMO);
        assertThat(testEstacion.getVia()).isEqualTo(UPDATED_VIA);
        assertThat(testEstacion.isVisible()).isEqualTo(UPDATED_VISIBLE);
    }

    @Test
    @Transactional
    public void updateNonExistingEstacion() throws Exception {
        int databaseSizeBeforeUpdate = estacionRepository.findAll().size();

        // Create the Estacion

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEstacionMockMvc.perform(put("/api/estacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estacion)))
            .andExpect(status().isCreated());

        // Validate the Estacion in the database
        List<Estacion> estacionList = estacionRepository.findAll();
        assertThat(estacionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEstacion() throws Exception {
        // Initialize the database
        estacionRepository.saveAndFlush(estacion);
        int databaseSizeBeforeDelete = estacionRepository.findAll().size();

        // Get the estacion
        restEstacionMockMvc.perform(delete("/api/estacions/{id}", estacion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Estacion> estacionList = estacionRepository.findAll();
        assertThat(estacionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Estacion.class);
        Estacion estacion1 = new Estacion();
        estacion1.setId(1L);
        Estacion estacion2 = new Estacion();
        estacion2.setId(estacion1.getId());
        assertThat(estacion1).isEqualTo(estacion2);
        estacion2.setId(2L);
        assertThat(estacion1).isNotEqualTo(estacion2);
        estacion1.setId(null);
        assertThat(estacion1).isNotEqualTo(estacion2);
    }
}
