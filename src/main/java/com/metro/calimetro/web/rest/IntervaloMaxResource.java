package com.metro.calimetro.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.metro.calimetro.domain.IntervaloMax;

import com.metro.calimetro.domain.Observaciones;
import com.metro.calimetro.repository.IntervaloMaxRepository;
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
 * REST controller for managing IntervaloMax.
 */
@RestController
@RequestMapping("/api")
public class IntervaloMaxResource {

    private final Logger log = LoggerFactory.getLogger(IntervaloMaxResource.class);

    private static final String ENTITY_NAME = "intervaloMax";

    private final IntervaloMaxRepository intervaloMaxRepository;

    public IntervaloMaxResource(IntervaloMaxRepository intervaloMaxRepository) {
        this.intervaloMaxRepository = intervaloMaxRepository;
    }

    /**
     * POST  /intervalo-maxes : Create a new intervaloMax.
     *
     * @param intervaloMax the intervaloMax to create
     * @return the ResponseEntity with status 201 (Created) and with body the new intervaloMax, or with status 400 (Bad Request) if the intervaloMax has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/intervalo-maxes")
    @Timed
    public ResponseEntity<IntervaloMax> createIntervaloMax(@Valid @RequestBody IntervaloMax intervaloMax) throws URISyntaxException {
        log.debug("REST request to save IntervaloMax : {}", intervaloMax);
        if (intervaloMax.getId() != null) {
            throw new BadRequestAlertException("A new intervaloMax cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IntervaloMax result = intervaloMaxRepository.save(intervaloMax);
        return ResponseEntity.created(new URI("/api/intervalo-maxes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /intervalo-maxes : Updates an existing intervaloMax.
     *
     * @param intervaloMax the intervaloMax to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated intervaloMax,
     * or with status 400 (Bad Request) if the intervaloMax is not valid,
     * or with status 500 (Internal Server Error) if the intervaloMax couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/intervalo-maxes")
    @Timed
    public ResponseEntity<IntervaloMax> updateIntervaloMax(@Valid @RequestBody IntervaloMax intervaloMax) throws URISyntaxException {
        log.debug("REST request to update IntervaloMax : {}", intervaloMax);
        if (intervaloMax.getId() == null) {
            return createIntervaloMax(intervaloMax);
        }
        IntervaloMax result = intervaloMaxRepository.save(intervaloMax);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, intervaloMax.getId().toString()))
            .body(result);
    }

    /**
     * GET  /intervalo-maxes : get all the intervaloMaxes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of intervaloMaxes in body
     */
    @GetMapping("/intervalo-maxes")
    @Timed
    public List<IntervaloMax> getAllIntervaloMaxes() {
        log.debug("REST request to get all IntervaloMaxes");
        return intervaloMaxRepository.findAll();
        }

    /**
     * GET  /intervalo-maxes/:id : get the "id" intervaloMax.
     *
     * @param id the id of the intervaloMax to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the intervaloMax, or with status 404 (Not Found)
     */
    @GetMapping("/intervalo-maxes/{id}")
    @Timed
    public ResponseEntity<IntervaloMax> getIntervaloMax(@PathVariable Long id) {
        log.debug("REST request to get IntervaloMax : {}", id);
        IntervaloMax intervaloMax = intervaloMaxRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(intervaloMax));
    }

    //-----------------------------------
    @GetMapping("/intervalo-maxes/fecha/{ini}")
    @Timed
    public List<IntervaloMax> getBetweenFechaDatos(@PathVariable String ini) {
        //--- Convertir string en zonedatetime
        LocalDateTime ldt1 = LocalDateTime.parse(ini, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        ZonedDateTime zone1 = ldt1.atZone(ZoneId.of("Europe/Paris"));
        LocalDateTime ldt2 = ldt1.plusHours(20);
        ZonedDateTime zone2 = ldt2.atZone(ZoneId.of("Europe/Paris"));
        log.debug("REST request to get Intervalo-Max segun Fecha : {}", ini);
        return intervaloMaxRepository.findByHoraBetween(zone1,zone2);
    }

    /**
     * DELETE  /intervalo-maxes/:id : delete the "id" intervaloMax.
     *
     * @param id the id of the intervaloMax to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/intervalo-maxes/{id}")
    @Timed
    public ResponseEntity<Void> deleteIntervaloMax(@PathVariable Long id) {
        log.debug("REST request to delete IntervaloMax : {}", id);
        intervaloMaxRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
