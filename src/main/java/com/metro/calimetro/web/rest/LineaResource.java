package com.metro.calimetro.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.metro.calimetro.domain.Linea;

import com.metro.calimetro.repository.LineaRepository;
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
 * REST controller for managing Linea.
 */
@RestController
@RequestMapping("/api")
public class LineaResource {

    private final Logger log = LoggerFactory.getLogger(LineaResource.class);

    private static final String ENTITY_NAME = "linea";

    private final LineaRepository lineaRepository;

    public LineaResource(LineaRepository lineaRepository) {
        this.lineaRepository = lineaRepository;
    }

    /**
     * POST  /lineas : Create a new linea.
     *
     * @param linea the linea to create
     * @return the ResponseEntity with status 201 (Created) and with body the new linea, or with status 400 (Bad Request) if the linea has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/lineas")
    @Timed
    public ResponseEntity<Linea> createLinea(@RequestBody Linea linea) throws URISyntaxException {
        log.debug("REST request to save Linea : {}", linea);
        if (linea.getId() != null) {
            throw new BadRequestAlertException("A new linea cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Linea result = lineaRepository.save(linea);
        return ResponseEntity.created(new URI("/api/lineas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /lineas : Updates an existing linea.
     *
     * @param linea the linea to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated linea,
     * or with status 400 (Bad Request) if the linea is not valid,
     * or with status 500 (Internal Server Error) if the linea couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/lineas")
    @Timed
    public ResponseEntity<Linea> updateLinea(@RequestBody Linea linea) throws URISyntaxException {
        log.debug("REST request to update Linea : {}", linea);
        if (linea.getId() == null) {
            return createLinea(linea);
        }
        Linea result = lineaRepository.save(linea);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, linea.getId().toString()))
            .body(result);
    }

    /**
     * GET  /lineas : get all the lineas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of lineas in body
     */
    @GetMapping("/lineas")
    @Timed
    public List<Linea> getAllLineas() {
        log.debug("REST request to get all Lineas");
        return lineaRepository.findAll();
        }

    /**
     * GET  /lineas/:id : get the "id" linea.
     *
     * @param id the id of the linea to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the linea, or with status 404 (Not Found)
     */
    @GetMapping("/lineas/{id}")
    @Timed
    public ResponseEntity<Linea> getLinea(@PathVariable Long id) {
        log.debug("REST request to get Linea : {}", id);
        Linea linea = lineaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(linea));
    }

    /**
     * DELETE  /lineas/:id : delete the "id" linea.
     *
     * @param id the id of the linea to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/lineas/{id}")
    @Timed
    public ResponseEntity<Void> deleteLinea(@PathVariable Long id) {
        log.debug("REST request to delete Linea : {}", id);
        lineaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
