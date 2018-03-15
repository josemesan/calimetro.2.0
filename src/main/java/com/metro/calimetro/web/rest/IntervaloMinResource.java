package com.metro.calimetro.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.metro.calimetro.domain.IntervaloMin;

import com.metro.calimetro.repository.IntervaloMinRepository;
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

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing IntervaloMin.
 */
@RestController
@RequestMapping("/api")
public class IntervaloMinResource {

    private final Logger log = LoggerFactory.getLogger(IntervaloMinResource.class);

    private static final String ENTITY_NAME = "intervaloMin";

    private final IntervaloMinRepository intervaloMinRepository;

    public IntervaloMinResource(IntervaloMinRepository intervaloMinRepository) {
        this.intervaloMinRepository = intervaloMinRepository;
    }

    /**
     * POST  /intervalo-mins : Create a new intervaloMin.
     *
     * @param intervaloMin the intervaloMin to create
     * @return the ResponseEntity with status 201 (Created) and with body the new intervaloMin, or with status 400 (Bad Request) if the intervaloMin has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/intervalo-mins")
    @Timed
    public ResponseEntity<IntervaloMin> createIntervaloMin(@Valid @RequestBody IntervaloMin intervaloMin) throws URISyntaxException {
        log.debug("REST request to save IntervaloMin : {}", intervaloMin);
        if (intervaloMin.getId() != null) {
            throw new BadRequestAlertException("A new intervaloMin cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IntervaloMin result = intervaloMinRepository.save(intervaloMin);
        return ResponseEntity.created(new URI("/api/intervalo-mins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /intervalo-mins : Updates an existing intervaloMin.
     *
     * @param intervaloMin the intervaloMin to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated intervaloMin,
     * or with status 400 (Bad Request) if the intervaloMin is not valid,
     * or with status 500 (Internal Server Error) if the intervaloMin couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/intervalo-mins")
    @Timed
    public ResponseEntity<IntervaloMin> updateIntervaloMin(@Valid @RequestBody IntervaloMin intervaloMin) throws URISyntaxException {
        log.debug("REST request to update IntervaloMin : {}", intervaloMin);
        if (intervaloMin.getId() == null) {
            return createIntervaloMin(intervaloMin);
        }
        IntervaloMin result = intervaloMinRepository.save(intervaloMin);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, intervaloMin.getId().toString()))
            .body(result);
    }

    /**
     * GET  /intervalo-mins : get all the intervaloMins.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of intervaloMins in body
     */
    @GetMapping("/intervalo-mins")
    @Timed
    public List<IntervaloMin> getAllIntervaloMins() {
        log.debug("REST request to get all IntervaloMins");
        return intervaloMinRepository.findAll();
        }

    /**
     * GET  /intervalo-mins/:id : get the "id" intervaloMin.
     *
     * @param id the id of the intervaloMin to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the intervaloMin, or with status 404 (Not Found)
     */
    @GetMapping("/intervalo-mins/{id}")
    @Timed
    public ResponseEntity<IntervaloMin> getIntervaloMin(@PathVariable Long id) {
        log.debug("REST request to get IntervaloMin : {}", id);
        IntervaloMin intervaloMin = intervaloMinRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(intervaloMin));
    }
    //------------------------------------------
    @GetMapping("/intervalo-mins/fecha/{ini}")
    @Timed
    public List<IntervaloMin> getBetweenFechaDatos(@PathVariable String ini) {
        //--- Convertir string en zonedatetime
        LocalDateTime ldt1 = LocalDateTime.parse(ini, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        ZonedDateTime zone1 = ldt1.atZone(ZoneId.of("Europe/Paris"));
        LocalDateTime ldt2 = ldt1.plusHours(20);
        ZonedDateTime zone2 = ldt2.atZone(ZoneId.of("Europe/Paris"));
        log.debug("REST request to get Intervalo-min segun Fecha : {}", ini);
        return intervaloMinRepository.findByHoraBetween(zone1,zone2);
    }
    /**
     * DELETE  /intervalo-mins/:id : delete the "id" intervaloMin.
     *
     * @param id the id of the intervaloMin to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/intervalo-mins/{id}")
    @Timed
    public ResponseEntity<Void> deleteIntervaloMin(@PathVariable Long id) {
        log.debug("REST request to delete IntervaloMin : {}", id);
        intervaloMinRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
