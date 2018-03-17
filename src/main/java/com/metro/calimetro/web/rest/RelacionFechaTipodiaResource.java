package com.metro.calimetro.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.metro.calimetro.domain.RelacionFechaTipodia;

import com.metro.calimetro.domain.enumeration.TipoDia;
import com.metro.calimetro.repository.RelacionFechaTipodiaRepository;
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

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing RelacionFechaTipodia.
 */
@RestController
@RequestMapping("/api")
public class RelacionFechaTipodiaResource {

    private final Logger log = LoggerFactory.getLogger(RelacionFechaTipodiaResource.class);

    private static final String ENTITY_NAME = "relacionFechaTipodia";

    private final RelacionFechaTipodiaRepository relacionFechaTipodiaRepository;

    public RelacionFechaTipodiaResource(RelacionFechaTipodiaRepository relacionFechaTipodiaRepository) {
        this.relacionFechaTipodiaRepository = relacionFechaTipodiaRepository;
    }

    /**
     * POST  /relacion-fecha-tipodias : Create a new relacionFechaTipodia.
     *
     * @param relacionFechaTipodia the relacionFechaTipodia to create
     * @return the ResponseEntity with status 201 (Created) and with body the new relacionFechaTipodia, or with status 400 (Bad Request) if the relacionFechaTipodia has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/relacion-fecha-tipodias")
    @Timed
    public ResponseEntity<RelacionFechaTipodia> createRelacionFechaTipodia(@Valid @RequestBody RelacionFechaTipodia relacionFechaTipodia) throws URISyntaxException {
        log.debug("REST request to save RelacionFechaTipodia : {}", relacionFechaTipodia);
        if (relacionFechaTipodia.getId() != null) {
            throw new BadRequestAlertException("A new relacionFechaTipodia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RelacionFechaTipodia result = relacionFechaTipodiaRepository.save(relacionFechaTipodia);
        return ResponseEntity.created(new URI("/api/relacion-fecha-tipodias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /relacion-fecha-tipodias : Updates an existing relacionFechaTipodia.
     *
     * @param relacionFechaTipodia the relacionFechaTipodia to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated relacionFechaTipodia,
     * or with status 400 (Bad Request) if the relacionFechaTipodia is not valid,
     * or with status 500 (Internal Server Error) if the relacionFechaTipodia couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/relacion-fecha-tipodias")
    @Timed
    public ResponseEntity<RelacionFechaTipodia> updateRelacionFechaTipodia(@Valid @RequestBody RelacionFechaTipodia relacionFechaTipodia) throws URISyntaxException {
        log.debug("REST request to update RelacionFechaTipodia : {}", relacionFechaTipodia);
        if (relacionFechaTipodia.getId() == null) {
            return createRelacionFechaTipodia(relacionFechaTipodia);
        }
        RelacionFechaTipodia result = relacionFechaTipodiaRepository.save(relacionFechaTipodia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, relacionFechaTipodia.getId().toString()))
            .body(result);
    }

    /**
     * GET  /relacion-fecha-tipodias : get all the relacionFechaTipodias.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of relacionFechaTipodias in body
     */
    @GetMapping("/relacion-fecha-tipodias")
    @Timed
    public List<RelacionFechaTipodia> getAllRelacionFechaTipodias() {
        log.debug("REST request to get all RelacionFechaTipodias");
        return relacionFechaTipodiaRepository.findAll();
        }

    /**
     * GET  /relacion-fecha-tipodias/:id : get the "id" relacionFechaTipodia.
     *
     * @param id the id of the relacionFechaTipodia to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the relacionFechaTipodia, or with status 404 (Not Found)
     */
    @GetMapping("/relacion-fecha-tipodias/{id}")
    @Timed
    public ResponseEntity<RelacionFechaTipodia> getRelacionFechaTipodia(@PathVariable Long id) {
        log.debug("REST request to get RelacionFechaTipodia : {}", id);
        RelacionFechaTipodia relacionFechaTipodia = relacionFechaTipodiaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(relacionFechaTipodia));
    }

    ////*********------------------
    @GetMapping("/relacion-fecha-tipodias/fecha/{id}")
    @Timed
    public TipoDia getFechaRelacionFechaTipodias(@PathVariable LocalDate id) {
        log.debug("REST request to get By Fecha RelacionFechaTipodias");
        TipoDia tipoDia = TipoDia.LAB;
        String dia;
        List<RelacionFechaTipodia> relacionLista = relacionFechaTipodiaRepository.findByFecha(id);

        if (relacionLista.size() == 0) {
            dia = id.getDayOfWeek().toString();
            switch (dia) {
                case "FRIDAY":
                        return TipoDia.VIER;
                case "SATURDAY":
                        return TipoDia.SAB;
                case "SUNDAY":
                        return TipoDia.FEST;
                default:
                        return TipoDia.LAB;
            }
        }
        else {
            return relacionLista.get(0).getTipoDia();
        }
    }

    /**
     * DELETE  /relacion-fecha-tipodias/:id : delete the "id" relacionFechaTipodia.
     *
     * @param id the id of the relacionFechaTipodia to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/relacion-fecha-tipodias/{id}")
    @Timed
    public ResponseEntity<Void> deleteRelacionFechaTipodia(@PathVariable Long id) {
        log.debug("REST request to delete RelacionFechaTipodia : {}", id);
        relacionFechaTipodiaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
