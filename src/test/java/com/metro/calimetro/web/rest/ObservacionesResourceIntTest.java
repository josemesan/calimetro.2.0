package com.metro.calimetro.web.rest;

import com.metro.calimetro.CalimetroApp;

import com.metro.calimetro.domain.Observaciones;
import com.metro.calimetro.repository.ObservacionesRepository;
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

/**
 * Test class for the ObservacionesResource REST controller.
 *
 * @see ObservacionesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CalimetroApp.class)
public class ObservacionesResourceIntTest {

    private static final String DEFAULT_TEXTO = "AAAAAAAAAA";
    private static final String UPDATED_TEXTO = "BBBBBBBBBB";

    @Autowired
    private ObservacionesRepository observacionesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restObservacionesMockMvc;

    private Observaciones observaciones;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ObservacionesResource observacionesResource = new ObservacionesResource(observacionesRepository);
        this.restObservacionesMockMvc = MockMvcBuilders.standaloneSetup(observacionesResource)
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
    public static Observaciones createEntity(EntityManager em) {
        Observaciones observaciones = new Observaciones()
            .texto(DEFAULT_TEXTO);
        return observaciones;
    }

    @Before
    public void initTest() {
        observaciones = createEntity(em);
    }

    @Test
    @Transactional
    public void createObservaciones() throws Exception {
        int databaseSizeBeforeCreate = observacionesRepository.findAll().size();

        // Create the Observaciones
        restObservacionesMockMvc.perform(post("/api/observaciones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(observaciones)))
            .andExpect(status().isCreated());

        // Validate the Observaciones in the database
        List<Observaciones> observacionesList = observacionesRepository.findAll();
        assertThat(observacionesList).hasSize(databaseSizeBeforeCreate + 1);
        Observaciones testObservaciones = observacionesList.get(observacionesList.size() - 1);
        assertThat(testObservaciones.getTexto()).isEqualTo(DEFAULT_TEXTO);
    }

    @Test
    @Transactional
    public void createObservacionesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = observacionesRepository.findAll().size();

        // Create the Observaciones with an existing ID
        observaciones.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restObservacionesMockMvc.perform(post("/api/observaciones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(observaciones)))
            .andExpect(status().isBadRequest());

        // Validate the Observaciones in the database
        List<Observaciones> observacionesList = observacionesRepository.findAll();
        assertThat(observacionesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllObservaciones() throws Exception {
        // Initialize the database
        observacionesRepository.saveAndFlush(observaciones);

        // Get all the observacionesList
        restObservacionesMockMvc.perform(get("/api/observaciones?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(observaciones.getId().intValue())))
            .andExpect(jsonPath("$.[*].texto").value(hasItem(DEFAULT_TEXTO.toString())));
    }

    @Test
    @Transactional
    public void getObservaciones() throws Exception {
        // Initialize the database
        observacionesRepository.saveAndFlush(observaciones);

        // Get the observaciones
        restObservacionesMockMvc.perform(get("/api/observaciones/{id}", observaciones.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(observaciones.getId().intValue()))
            .andExpect(jsonPath("$.texto").value(DEFAULT_TEXTO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingObservaciones() throws Exception {
        // Get the observaciones
        restObservacionesMockMvc.perform(get("/api/observaciones/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateObservaciones() throws Exception {
        // Initialize the database
        observacionesRepository.saveAndFlush(observaciones);
        int databaseSizeBeforeUpdate = observacionesRepository.findAll().size();

        // Update the observaciones
        Observaciones updatedObservaciones = observacionesRepository.findOne(observaciones.getId());
        // Disconnect from session so that the updates on updatedObservaciones are not directly saved in db
        em.detach(updatedObservaciones);
        updatedObservaciones
            .texto(UPDATED_TEXTO);

        restObservacionesMockMvc.perform(put("/api/observaciones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedObservaciones)))
            .andExpect(status().isOk());

        // Validate the Observaciones in the database
        List<Observaciones> observacionesList = observacionesRepository.findAll();
        assertThat(observacionesList).hasSize(databaseSizeBeforeUpdate);
        Observaciones testObservaciones = observacionesList.get(observacionesList.size() - 1);
        assertThat(testObservaciones.getTexto()).isEqualTo(UPDATED_TEXTO);
    }

    @Test
    @Transactional
    public void updateNonExistingObservaciones() throws Exception {
        int databaseSizeBeforeUpdate = observacionesRepository.findAll().size();

        // Create the Observaciones

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restObservacionesMockMvc.perform(put("/api/observaciones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(observaciones)))
            .andExpect(status().isCreated());

        // Validate the Observaciones in the database
        List<Observaciones> observacionesList = observacionesRepository.findAll();
        assertThat(observacionesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteObservaciones() throws Exception {
        // Initialize the database
        observacionesRepository.saveAndFlush(observaciones);
        int databaseSizeBeforeDelete = observacionesRepository.findAll().size();

        // Get the observaciones
        restObservacionesMockMvc.perform(delete("/api/observaciones/{id}", observaciones.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Observaciones> observacionesList = observacionesRepository.findAll();
        assertThat(observacionesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Observaciones.class);
        Observaciones observaciones1 = new Observaciones();
        observaciones1.setId(1L);
        Observaciones observaciones2 = new Observaciones();
        observaciones2.setId(observaciones1.getId());
        assertThat(observaciones1).isEqualTo(observaciones2);
        observaciones2.setId(2L);
        assertThat(observaciones1).isNotEqualTo(observaciones2);
        observaciones1.setId(null);
        assertThat(observaciones1).isNotEqualTo(observaciones2);
    }
}
