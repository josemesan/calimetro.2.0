package com.metro.calimetro.web.rest;

import com.metro.calimetro.CalimetroApp;

import com.metro.calimetro.domain.Linea;
import com.metro.calimetro.repository.LineaRepository;
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
 * Test class for the LineaResource REST controller.
 *
 * @see LineaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CalimetroApp.class)
public class LineaResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_VISIBLE = false;
    private static final Boolean UPDATED_VISIBLE = true;

    @Autowired
    private LineaRepository lineaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLineaMockMvc;

    private Linea linea;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LineaResource lineaResource = new LineaResource(lineaRepository);
        this.restLineaMockMvc = MockMvcBuilders.standaloneSetup(lineaResource)
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
    public static Linea createEntity(EntityManager em) {
        Linea linea = new Linea()
            .nombre(DEFAULT_NOMBRE)
            .visible(DEFAULT_VISIBLE);
        return linea;
    }

    @Before
    public void initTest() {
        linea = createEntity(em);
    }

    @Test
    @Transactional
    public void createLinea() throws Exception {
        int databaseSizeBeforeCreate = lineaRepository.findAll().size();

        // Create the Linea
        restLineaMockMvc.perform(post("/api/lineas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(linea)))
            .andExpect(status().isCreated());

        // Validate the Linea in the database
        List<Linea> lineaList = lineaRepository.findAll();
        assertThat(lineaList).hasSize(databaseSizeBeforeCreate + 1);
        Linea testLinea = lineaList.get(lineaList.size() - 1);
        assertThat(testLinea.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testLinea.isVisible()).isEqualTo(DEFAULT_VISIBLE);
    }

    @Test
    @Transactional
    public void createLineaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lineaRepository.findAll().size();

        // Create the Linea with an existing ID
        linea.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLineaMockMvc.perform(post("/api/lineas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(linea)))
            .andExpect(status().isBadRequest());

        // Validate the Linea in the database
        List<Linea> lineaList = lineaRepository.findAll();
        assertThat(lineaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllLineas() throws Exception {
        // Initialize the database
        lineaRepository.saveAndFlush(linea);

        // Get all the lineaList
        restLineaMockMvc.perform(get("/api/lineas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(linea.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].visible").value(hasItem(DEFAULT_VISIBLE.booleanValue())));
    }

    @Test
    @Transactional
    public void getLinea() throws Exception {
        // Initialize the database
        lineaRepository.saveAndFlush(linea);

        // Get the linea
        restLineaMockMvc.perform(get("/api/lineas/{id}", linea.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(linea.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.visible").value(DEFAULT_VISIBLE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingLinea() throws Exception {
        // Get the linea
        restLineaMockMvc.perform(get("/api/lineas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLinea() throws Exception {
        // Initialize the database
        lineaRepository.saveAndFlush(linea);
        int databaseSizeBeforeUpdate = lineaRepository.findAll().size();

        // Update the linea
        Linea updatedLinea = lineaRepository.findOne(linea.getId());
        // Disconnect from session so that the updates on updatedLinea are not directly saved in db
        em.detach(updatedLinea);
        updatedLinea
            .nombre(UPDATED_NOMBRE)
            .visible(UPDATED_VISIBLE);

        restLineaMockMvc.perform(put("/api/lineas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLinea)))
            .andExpect(status().isOk());

        // Validate the Linea in the database
        List<Linea> lineaList = lineaRepository.findAll();
        assertThat(lineaList).hasSize(databaseSizeBeforeUpdate);
        Linea testLinea = lineaList.get(lineaList.size() - 1);
        assertThat(testLinea.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testLinea.isVisible()).isEqualTo(UPDATED_VISIBLE);
    }

    @Test
    @Transactional
    public void updateNonExistingLinea() throws Exception {
        int databaseSizeBeforeUpdate = lineaRepository.findAll().size();

        // Create the Linea

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLineaMockMvc.perform(put("/api/lineas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(linea)))
            .andExpect(status().isCreated());

        // Validate the Linea in the database
        List<Linea> lineaList = lineaRepository.findAll();
        assertThat(lineaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLinea() throws Exception {
        // Initialize the database
        lineaRepository.saveAndFlush(linea);
        int databaseSizeBeforeDelete = lineaRepository.findAll().size();

        // Get the linea
        restLineaMockMvc.perform(delete("/api/lineas/{id}", linea.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Linea> lineaList = lineaRepository.findAll();
        assertThat(lineaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Linea.class);
        Linea linea1 = new Linea();
        linea1.setId(1L);
        Linea linea2 = new Linea();
        linea2.setId(linea1.getId());
        assertThat(linea1).isEqualTo(linea2);
        linea2.setId(2L);
        assertThat(linea1).isNotEqualTo(linea2);
        linea1.setId(null);
        assertThat(linea1).isNotEqualTo(linea2);
    }
}
