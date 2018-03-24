package com.metro.calimetro.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.metro.calimetro.domain.Datos;

import com.metro.calimetro.repository.DatosRepository;
import com.metro.calimetro.web.rest.errors.BadRequestAlertException;
import com.metro.calimetro.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

import java.util.Collections;

/**
 * REST controller for managing Datos.
 */
@RestController
@RequestMapping("/api")
public class DatosResource {

    private final Logger log = LoggerFactory.getLogger(DatosResource.class);

    private static final String ENTITY_NAME = "datos";

    private final DatosRepository datosRepository;

    public DatosResource(DatosRepository datosRepository) {
        this.datosRepository = datosRepository;
    }

    /**
     * POST  /datos : Create a new datos.
     *
     * @param datos the datos to create
     * @return the ResponseEntity with status 201 (Created) and with body the new datos, or with status 400 (Bad Request) if the datos has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/datos")
    @Timed
    public ResponseEntity<Datos> createDatos(@RequestBody Datos datos) throws URISyntaxException {
        log.debug("REST request to save Datos : {}", datos);
        if (datos.getId() != null) {
            throw new BadRequestAlertException("A new datos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Datos result = datosRepository.save(datos);
        return ResponseEntity.created(new URI("/api/datos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /datos : Updates an existing datos.
     *
     * @param datos the datos to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated datos,
     * or with status 400 (Bad Request) if the datos is not valid,
     * or with status 500 (Internal Server Error) if the datos couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/datos")
    @Timed
    public ResponseEntity<Datos> updateDatos(@RequestBody Datos datos) throws URISyntaxException {
        log.debug("REST request to update Datos : {}", datos);
        if (datos.getId() == null) {
            return createDatos(datos);
        }
        Datos result = datosRepository.save(datos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, datos.getId().toString()))
            .body(result);
    }

    /**
     * GET  /datos : get all the datos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of datos in body
     */
    @GetMapping("/datos")
    @Timed
    public List<Datos> getAllDatos() {
        log.debug("REST request to get all Datos");
        return datosRepository.findAll();
        }

    @GetMapping("/datos/fecha/{ini}/{lin}")
    @Timed
    public List<Datos> getBetweenFechaDatosLinea(@PathVariable String ini,@PathVariable String lin) {
        //--- Convertir string en zonedatetime
        LocalDateTime ldt1 = LocalDateTime.parse(ini, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        ZonedDateTime zone1 = ldt1.atZone(ZoneId.of("Europe/Paris"));
        LocalDateTime ldt2 = ldt1.plusHours(20);
        ZonedDateTime zone2 = ldt2.atZone(ZoneId.of("Europe/Paris"));
        log.debug("REST request to get Datos segun Fecha : {}", ini);

        List<Datos> lista = datosRepository.findByFechaHoraBetweenAndLineaNombre(zone1,zone2, lin);
        lista.sort(new Comparator<Datos>() {
            @Override
            public int compare(Datos o1, Datos o2) {
                return o1.getFechaHora().compareTo(o2.getFechaHora());
            }
        });
        return lista;



    }
    @GetMapping("/datos/fecha/{ini}")
    @Timed
    public List<Datos> getBetweenFechaDatos(@PathVariable String ini) {
        //--- Convertir string en zonedatetime
        LocalDateTime ldt1 = LocalDateTime.parse(ini, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        ZonedDateTime zone1 = ldt1.atZone(ZoneId.of("Europe/Paris"));
        LocalDateTime ldt2 = ldt1.plusHours(20);
        ZonedDateTime zone2 = ldt2.atZone(ZoneId.of("Europe/Paris"));
        log.debug("REST request to get Datos segun Fecha : {}", ini);

        List<Datos> lista = datosRepository.findByFechaHoraBetween(zone1,zone2);
        lista.sort(new Comparator<Datos>() {
            @Override
            public int compare(Datos o1, Datos o2) {
                return o1.getFechaHora().compareTo(o2.getFechaHora());
            }
        });
        return lista;
    }

//--------------------------------- viajeros
    @GetMapping("/datos/viajeros/{ini}/{lin}")
    @Timed
    public List<Long> getBetweenFechaDatosLineaViajeros(@PathVariable String ini,@PathVariable String lin) {
        //--- Convertir string en zonedatetime
        LocalDateTime ldt1 = LocalDateTime.parse(ini, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        ZonedDateTime zone1 = ldt1.atZone(ZoneId.of("Europe/Paris"));
        LocalDateTime ldt2 = ldt1.plusHours(20);
        ZonedDateTime zone2 = ldt2.atZone(ZoneId.of("Europe/Paris"));
        log.debug("REST request to get Datos Viajeros : {}", ini,lin);
        List<Long> viajeros = new ArrayList<Long>();
        List<Datos> datos= datosRepository.findByFechaHoraBetween(zone1,zone2);
        Integer viajerosLinea = 0;
        Integer viajerosTotal = 0;

        for (Datos dato: datos) {
            String linea=dato.getLinea().getNombre();
            if (linea.compareTo(lin) == 0) {
                viajerosTotal= viajerosTotal + dato.getViajeros();
                viajerosLinea= viajerosLinea + dato.getViajeros();
            }
            else {
                viajerosTotal = viajerosTotal + dato.getViajeros();
            }
        }
        LocalDateTime ldt1Ayer = LocalDateTime.parse(ini, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        ZonedDateTime zone1Ayer = ldt1Ayer.atZone(ZoneId.of("Europe/Paris"));
        zone1Ayer = zone1Ayer.minusDays(7);
        LocalDateTime ldt2Ayer = ldt1Ayer.plusHours(20);
        ZonedDateTime zone2Ayer = ldt2Ayer.atZone(ZoneId.of("Europe/Paris"));
        zone2Ayer = zone2Ayer.minusDays(1);

        datos= datosRepository.findByFechaHoraBetween(zone1Ayer,zone2Ayer);
        Integer viajerosLineaAyer = 0;
        Integer viajerosTotalAyer = 0;

        for (Datos dato: datos) {
            String linea=dato.getLinea().getNombre();
            if (linea.compareTo(lin) == 0) {
                viajerosTotalAyer= viajerosTotalAyer + dato.getViajeros();
                viajerosLineaAyer= viajerosLineaAyer + dato.getViajeros();
            }
            else {
                viajerosTotalAyer = viajerosTotalAyer + dato.getViajeros();
            }
        }
        viajeros.add(Long.valueOf(viajerosLinea));
        viajeros.add(Long.valueOf(viajerosTotal));
        viajeros.add(Long.valueOf(viajerosLineaAyer));
        viajeros.add(Long.valueOf(viajerosTotalAyer));

        return viajeros;
    }

    /**
     * GET  /datos/:id : get the "id" datos.
     *
     * @param id the id of the datos to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the datos, or with status 404 (Not Found)
     */
    @GetMapping("/datos/{id}")
    @Timed
    public ResponseEntity<Datos> getDatos(@PathVariable Long id) {
        log.debug("REST request to get Datos : {}", id);
        Datos datos = datosRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(datos));
    }

    /**
     * DELETE  /datos/:id : delete the "id" datos.
     *
     * @param id the id of the datos to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/datos/{id}")
    @Timed
    public ResponseEntity<Void> deleteDatos(@PathVariable Long id) {
        log.debug("REST request to delete Datos : {}", id);
        datosRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
