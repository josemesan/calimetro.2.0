package com.metro.calimetro.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.metro.calimetro.domain.Estacion;

import com.metro.calimetro.repository.EstacionRepository;
import com.metro.calimetro.web.rest.errors.BadRequestAlertException;
import com.metro.calimetro.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Estacion.
 */
@RestController
@RequestMapping("/api")
public class EstacionResource {

    private final Logger log = LoggerFactory.getLogger(EstacionResource.class);

    private static final String ENTITY_NAME = "estacion";

    private final EstacionRepository estacionRepository;

    public EstacionResource(EstacionRepository estacionRepository) {
        this.estacionRepository = estacionRepository;
    }

    /**
     * POST  /estacions : Create a new estacion.
     *
     * @param estacion the estacion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new estacion, or with status 400 (Bad Request) if the estacion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/estacions")
    @Timed
    public ResponseEntity<Estacion> createEstacion(@Valid @RequestBody Estacion estacion) throws URISyntaxException {
        log.debug("REST request to save Estacion : {}", estacion);
        if (estacion.getId() != null) {
            throw new BadRequestAlertException("A new estacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Estacion result = estacionRepository.save(estacion);
        return ResponseEntity.created(new URI("/api/estacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /estacions : Updates an existing estacion.
     *
     * @param estacion the estacion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated estacion,
     * or with status 400 (Bad Request) if the estacion is not valid,
     * or with status 500 (Internal Server Error) if the estacion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/estacions")
    @Timed
    public ResponseEntity<Estacion> updateEstacion(@Valid @RequestBody Estacion estacion) throws URISyntaxException {
        log.debug("REST request to update Estacion : {}", estacion);
        if (estacion.getId() == null) {
            return createEstacion(estacion);
        }
        Estacion result = estacionRepository.save(estacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, estacion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /estacions : get all the estacions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of estacions in body
     */
    @GetMapping("/estacions")
    @Timed
    public List<Estacion> getAllEstacions() {
        log.debug("REST request to get all Estacions");
        return estacionRepository.findAll();
        }

    /**
     * GET  /estacions/:id : get the "id" estacion.
     *
     * @param id the id of the estacion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the estacion, or with status 404 (Not Found)
     */
    @GetMapping("/estacions/{id}")
    @Timed
    public ResponseEntity<Estacion> getEstacion(@PathVariable Long id) {
        log.debug("REST request to get Estacion : {}", id);
        Estacion estacion = estacionRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(estacion));
    }
    ///---------------------------------
    @GetMapping("/estacions/linea/{nombre}")
    @Timed
    public List<Estacion> getBetweenFechaDatos(@PathVariable String nombre) {
        log.debug("REST request to get Estacion by Linea : {}", nombre);
        return estacionRepository.findByLineaNombre(nombre);
    }

    /**
     * DELETE  /estacions/:id : delete the "id" estacion.
     *
     * @param id the id of the estacion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/estacions/{id}")
    @Timed
    public ResponseEntity<Void> deleteEstacion(@PathVariable Long id) {
        log.debug("REST request to delete Estacion : {}", id);
        estacionRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
