package com.metro.calimetro.web.rest;

import com.metro.calimetro.CalimetroApp;

import com.metro.calimetro.domain.Datos;
import com.metro.calimetro.repository.DatosRepository;
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

/**
 * Test class for the DatosResource REST controller.
 *
 * @see DatosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CalimetroApp.class)
public class DatosResourceIntTest {

    private static final ZonedDateTime DEFAULT_FECHA_HORA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_HORA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Integer DEFAULT_INTERVALO_MEDIO = 1;
    private static final Integer UPDATED_INTERVALO_MEDIO = 2;

    private static final Integer DEFAULT_DESVIACION_MEDIA = 1;
    private static final Integer UPDATED_DESVIACION_MEDIA = 2;

    private static final Integer DEFAULT_TIEMPO_VUELTA = 1;
    private static final Integer UPDATED_TIEMPO_VUELTA = 2;

    private static final Integer DEFAULT_NUMERO_TRENES = 1;
    private static final Integer UPDATED_NUMERO_TRENES = 2;

    private static final Integer DEFAULT_VIAJEROS = 1;
    private static final Integer UPDATED_VIAJEROS = 2;

    private static final Integer DEFAULT_TOC = 1;
    private static final Integer UPDATED_TOC = 2;

    private static final Integer DEFAULT_DENSIDAD = 1;
    private static final Integer UPDATED_DENSIDAD = 2;

    private static final Integer DEFAULT_CONSUMO = 1;
    private static final Integer UPDATED_CONSUMO = 2;

    private static final Integer DEFAULT_VELOCIDAD = 1;
    private static final Integer UPDATED_VELOCIDAD = 2;

    private static final Integer DEFAULT_COCHE_KM = 1;
    private static final Integer UPDATED_COCHE_KM = 2;

    @Autowired
    private DatosRepository datosRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDatosMockMvc;

    private Datos datos;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DatosResource datosResource = new DatosResource(datosRepository);
        this.restDatosMockMvc = MockMvcBuilders.standaloneSetup(datosResource)
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
    public static Datos createEntity(EntityManager em) {
        Datos datos = new Datos()
            .fechaHora(DEFAULT_FECHA_HORA)
            .intervaloMedio(DEFAULT_INTERVALO_MEDIO)
            .desviacionMedia(DEFAULT_DESVIACION_MEDIA)
            .tiempoVuelta(DEFAULT_TIEMPO_VUELTA)
            .numeroTrenes(DEFAULT_NUMERO_TRENES)
            .viajeros(DEFAULT_VIAJEROS)
            .toc(DEFAULT_TOC)
            .densidad(DEFAULT_DENSIDAD)
            .consumo(DEFAULT_CONSUMO)
            .velocidad(DEFAULT_VELOCIDAD)
            .cocheKm(DEFAULT_COCHE_KM);
        return datos;
    }

    @Before
    public void initTest() {
        datos = createEntity(em);
    }

    @Test
    @Transactional
    public void createDatos() throws Exception {
        int databaseSizeBeforeCreate = datosRepository.findAll().size();

        // Create the Datos
        restDatosMockMvc.perform(post("/api/datos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(datos)))
            .andExpect(status().isCreated());

        // Validate the Datos in the database
        List<Datos> datosList = datosRepository.findAll();
        assertThat(datosList).hasSize(databaseSizeBeforeCreate + 1);
        Datos testDatos = datosList.get(datosList.size() - 1);
        assertThat(testDatos.getFechaHora()).isEqualTo(DEFAULT_FECHA_HORA);
        assertThat(testDatos.getIntervaloMedio()).isEqualTo(DEFAULT_INTERVALO_MEDIO);
        assertThat(testDatos.getDesviacionMedia()).isEqualTo(DEFAULT_DESVIACION_MEDIA);
        assertThat(testDatos.getTiempoVuelta()).isEqualTo(DEFAULT_TIEMPO_VUELTA);
        assertThat(testDatos.getNumeroTrenes()).isEqualTo(DEFAULT_NUMERO_TRENES);
        assertThat(testDatos.getViajeros()).isEqualTo(DEFAULT_VIAJEROS);
        assertThat(testDatos.getToc()).isEqualTo(DEFAULT_TOC);
        assertThat(testDatos.getDensidad()).isEqualTo(DEFAULT_DENSIDAD);
        assertThat(testDatos.getConsumo()).isEqualTo(DEFAULT_CONSUMO);
        assertThat(testDatos.getVelocidad()).isEqualTo(DEFAULT_VELOCIDAD);
        assertThat(testDatos.getCocheKm()).isEqualTo(DEFAULT_COCHE_KM);
    }

    @Test
    @Transactional
    public void createDatosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = datosRepository.findAll().size();

        // Create the Datos with an existing ID
        datos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDatosMockMvc.perform(post("/api/datos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(datos)))
            .andExpect(status().isBadRequest());

        // Validate the Datos in the database
        List<Datos> datosList = datosRepository.findAll();
        assertThat(datosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDatos() throws Exception {
        // Initialize the database
        datosRepository.saveAndFlush(datos);

        // Get all the datosList
        restDatosMockMvc.perform(get("/api/datos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(datos.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaHora").value(hasItem(sameInstant(DEFAULT_FECHA_HORA))))
            .andExpect(jsonPath("$.[*].intervaloMedio").value(hasItem(DEFAULT_INTERVALO_MEDIO)))
            .andExpect(jsonPath("$.[*].desviacionMedia").value(hasItem(DEFAULT_DESVIACION_MEDIA)))
            .andExpect(jsonPath("$.[*].tiempoVuelta").value(hasItem(DEFAULT_TIEMPO_VUELTA)))
            .andExpect(jsonPath("$.[*].numeroTrenes").value(hasItem(DEFAULT_NUMERO_TRENES)))
            .andExpect(jsonPath("$.[*].viajeros").value(hasItem(DEFAULT_VIAJEROS)))
            .andExpect(jsonPath("$.[*].toc").value(hasItem(DEFAULT_TOC)))
            .andExpect(jsonPath("$.[*].densidad").value(hasItem(DEFAULT_DENSIDAD)))
            .andExpect(jsonPath("$.[*].consumo").value(hasItem(DEFAULT_CONSUMO)))
            .andExpect(jsonPath("$.[*].velocidad").value(hasItem(DEFAULT_VELOCIDAD)))
            .andExpect(jsonPath("$.[*].cocheKm").value(hasItem(DEFAULT_COCHE_KM)));
    }

    @Test
    @Transactional
    public void getDatos() throws Exception {
        // Initialize the database
        datosRepository.saveAndFlush(datos);

        // Get the datos
        restDatosMockMvc.perform(get("/api/datos/{id}", datos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(datos.getId().intValue()))
            .andExpect(jsonPath("$.fechaHora").value(sameInstant(DEFAULT_FECHA_HORA)))
            .andExpect(jsonPath("$.intervaloMedio").value(DEFAULT_INTERVALO_MEDIO))
            .andExpect(jsonPath("$.desviacionMedia").value(DEFAULT_DESVIACION_MEDIA))
            .andExpect(jsonPath("$.tiempoVuelta").value(DEFAULT_TIEMPO_VUELTA))
            .andExpect(jsonPath("$.numeroTrenes").value(DEFAULT_NUMERO_TRENES))
            .andExpect(jsonPath("$.viajeros").value(DEFAULT_VIAJEROS))
            .andExpect(jsonPath("$.toc").value(DEFAULT_TOC))
            .andExpect(jsonPath("$.densidad").value(DEFAULT_DENSIDAD))
            .andExpect(jsonPath("$.consumo").value(DEFAULT_CONSUMO))
            .andExpect(jsonPath("$.velocidad").value(DEFAULT_VELOCIDAD))
            .andExpect(jsonPath("$.cocheKm").value(DEFAULT_COCHE_KM));
    }

    @Test
    @Transactional
    public void getNonExistingDatos() throws Exception {
        // Get the datos
        restDatosMockMvc.perform(get("/api/datos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDatos() throws Exception {
        // Initialize the database
        datosRepository.saveAndFlush(datos);
        int databaseSizeBeforeUpdate = datosRepository.findAll().size();

        // Update the datos
        Datos updatedDatos = datosRepository.findOne(datos.getId());
        // Disconnect from session so that the updates on updatedDatos are not directly saved in db
        em.detach(updatedDatos);
        updatedDatos
            .fechaHora(UPDATED_FECHA_HORA)
            .intervaloMedio(UPDATED_INTERVALO_MEDIO)
            .desviacionMedia(UPDATED_DESVIACION_MEDIA)
            .tiempoVuelta(UPDATED_TIEMPO_VUELTA)
            .numeroTrenes(UPDATED_NUMERO_TRENES)
            .viajeros(UPDATED_VIAJEROS)
            .toc(UPDATED_TOC)
            .densidad(UPDATED_DENSIDAD)
            .consumo(UPDATED_CONSUMO)
            .velocidad(UPDATED_VELOCIDAD)
            .cocheKm(UPDATED_COCHE_KM);

        restDatosMockMvc.perform(put("/api/datos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDatos)))
            .andExpect(status().isOk());

        // Validate the Datos in the database
        List<Datos> datosList = datosRepository.findAll();
        assertThat(datosList).hasSize(databaseSizeBeforeUpdate);
        Datos testDatos = datosList.get(datosList.size() - 1);
        assertThat(testDatos.getFechaHora()).isEqualTo(UPDATED_FECHA_HORA);
        assertThat(testDatos.getIntervaloMedio()).isEqualTo(UPDATED_INTERVALO_MEDIO);
        assertThat(testDatos.getDesviacionMedia()).isEqualTo(UPDATED_DESVIACION_MEDIA);
        assertThat(testDatos.getTiempoVuelta()).isEqualTo(UPDATED_TIEMPO_VUELTA);
        assertThat(testDatos.getNumeroTrenes()).isEqualTo(UPDATED_NUMERO_TRENES);
        assertThat(testDatos.getViajeros()).isEqualTo(UPDATED_VIAJEROS);
        assertThat(testDatos.getToc()).isEqualTo(UPDATED_TOC);
        assertThat(testDatos.getDensidad()).isEqualTo(UPDATED_DENSIDAD);
        assertThat(testDatos.getConsumo()).isEqualTo(UPDATED_CONSUMO);
        assertThat(testDatos.getVelocidad()).isEqualTo(UPDATED_VELOCIDAD);
        assertThat(testDatos.getCocheKm()).isEqualTo(UPDATED_COCHE_KM);
    }

    @Test
    @Transactional
    public void updateNonExistingDatos() throws Exception {
        int databaseSizeBeforeUpdate = datosRepository.findAll().size();

        // Create the Datos

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDatosMockMvc.perform(put("/api/datos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(datos)))
            .andExpect(status().isCreated());

        // Validate the Datos in the database
        List<Datos> datosList = datosRepository.findAll();
        assertThat(datosList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDatos() throws Exception {
        // Initialize the database
        datosRepository.saveAndFlush(datos);
        int databaseSizeBeforeDelete = datosRepository.findAll().size();

        // Get the datos
        restDatosMockMvc.perform(delete("/api/datos/{id}", datos.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Datos> datosList = datosRepository.findAll();
        assertThat(datosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Datos.class);
        Datos datos1 = new Datos();
        datos1.setId(1L);
        Datos datos2 = new Datos();
        datos2.setId(datos1.getId());
        assertThat(datos1).isEqualTo(datos2);
        datos2.setId(2L);
        assertThat(datos1).isNotEqualTo(datos2);
        datos1.setId(null);
        assertThat(datos1).isNotEqualTo(datos2);
    }
}
