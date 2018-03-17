package com.metro.calimetro.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.metro.calimetro.domain.TablaTrenes;

import com.metro.calimetro.domain.enumeration.TipoDia;
import com.metro.calimetro.repository.TablaTrenesRepository;
import com.metro.calimetro.web.rest.errors.BadRequestAlertException;
import com.metro.calimetro.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TablaTrenes.
 */
@RestController
@RequestMapping("/api")
public class TablaTrenesResource {

    private final Logger log = LoggerFactory.getLogger(TablaTrenesResource.class);

    private static final String ENTITY_NAME = "tablaTrenes";

    private final TablaTrenesRepository tablaTrenesRepository;

    public TablaTrenesResource(TablaTrenesRepository tablaTrenesRepository) {
        this.tablaTrenesRepository = tablaTrenesRepository;
    }

    /**
     * POST  /tabla-trenes : Create a new tablaTrenes.
     *
     * @param tablaTrenes the tablaTrenes to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tablaTrenes, or with status 400 (Bad Request) if the tablaTrenes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tabla-trenes")
    @Timed
    public ResponseEntity<TablaTrenes> createTablaTrenes(@RequestBody TablaTrenes tablaTrenes) throws URISyntaxException {
        log.debug("REST request to save TablaTrenes : {}", tablaTrenes);
        if (tablaTrenes.getId() != null) {
            throw new BadRequestAlertException("A new tablaTrenes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TablaTrenes result = tablaTrenesRepository.save(tablaTrenes);
        return ResponseEntity.created(new URI("/api/tabla-trenes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tabla-trenes : Updates an existing tablaTrenes.
     *
     * @param tablaTrenes the tablaTrenes to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tablaTrenes,
     * or with status 400 (Bad Request) if the tablaTrenes is not valid,
     * or with status 500 (Internal Server Error) if the tablaTrenes couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tabla-trenes")
    @Timed
    public ResponseEntity<TablaTrenes> updateTablaTrenes(@RequestBody TablaTrenes tablaTrenes) throws URISyntaxException {
        log.debug("REST request to update TablaTrenes : {}", tablaTrenes);
        if (tablaTrenes.getId() == null) {
            return createTablaTrenes(tablaTrenes);
        }
        TablaTrenes result = tablaTrenesRepository.save(tablaTrenes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tablaTrenes.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tabla-trenes : get all the tablaTrenes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tablaTrenes in body
     */
    @GetMapping("/tabla-trenes")
    @Timed
    public List<TablaTrenes> getAllTablaTrenes() {
        log.debug("REST request to get all TablaTrenes");
        return tablaTrenesRepository.findAll();
        }

    /**
     * GET  /tabla-trenes/:id : get the "id" tablaTrenes.
     *
     * @param id the id of the tablaTrenes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tablaTrenes, or with status 404 (Not Found)
     */
    @GetMapping("/tabla-trenes/{id}")
    @Timed
    public ResponseEntity<TablaTrenes> getTablaTrenes(@PathVariable Long id) {
        log.debug("REST request to get TablaTrenes : {}", id);
        TablaTrenes tablaTrenes = tablaTrenesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tablaTrenes));
    }


    ///----------------------------------------------
    @GetMapping("/tabla-trenes/lineaTipo/{nombre}/{tipo}")
    @Timed
    public List<TablaTrenes> getBetweenFechaDatos(@PathVariable String nombre, @PathVariable TipoDia tipo) {
        log.debug("REST request to get Estacion by Linea and tipo: : {}", nombre, tipo);
        return tablaTrenesRepository.findByLineaNombreAndTipoDia(nombre, tipo);
    }

    /**
     * DELETE  /tabla-trenes/:id : delete the "id" tablaTrenes.
     *
     * @param id the id of the tablaTrenes to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tabla-trenes/{id}")
    @Timed
    public ResponseEntity<Void> deleteTablaTrenes(@PathVariable Long id) {
        log.debug("REST request to delete TablaTrenes : {}", id);
        tablaTrenesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
