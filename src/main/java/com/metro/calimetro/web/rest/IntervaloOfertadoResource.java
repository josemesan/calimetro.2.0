package com.metro.calimetro.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.metro.calimetro.domain.IntervaloOfertado;

import com.metro.calimetro.domain.enumeration.TipoDia;
import com.metro.calimetro.repository.IntervaloOfertadoRepository;
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
 * REST controller for managing IntervaloOfertado.
 */
@RestController
@RequestMapping("/api")
public class IntervaloOfertadoResource {

    private final Logger log = LoggerFactory.getLogger(IntervaloOfertadoResource.class);

    private static final String ENTITY_NAME = "intervaloOfertado";

    private final IntervaloOfertadoRepository intervaloOfertadoRepository;

    public IntervaloOfertadoResource(IntervaloOfertadoRepository intervaloOfertadoRepository) {
        this.intervaloOfertadoRepository = intervaloOfertadoRepository;
    }

    /**
     * POST  /intervalo-ofertados : Create a new intervaloOfertado.
     *
     * @param intervaloOfertado the intervaloOfertado to create
     * @return the ResponseEntity with status 201 (Created) and with body the new intervaloOfertado, or with status 400 (Bad Request) if the intervaloOfertado has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/intervalo-ofertados")
    @Timed
    public ResponseEntity<IntervaloOfertado> createIntervaloOfertado(@RequestBody IntervaloOfertado intervaloOfertado) throws URISyntaxException {
        log.debug("REST request to save IntervaloOfertado : {}", intervaloOfertado);
        if (intervaloOfertado.getId() != null) {
            throw new BadRequestAlertException("A new intervaloOfertado cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IntervaloOfertado result = intervaloOfertadoRepository.save(intervaloOfertado);
        return ResponseEntity.created(new URI("/api/intervalo-ofertados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /intervalo-ofertados : Updates an existing intervaloOfertado.
     *
     * @param intervaloOfertado the intervaloOfertado to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated intervaloOfertado,
     * or with status 400 (Bad Request) if the intervaloOfertado is not valid,
     * or with status 500 (Internal Server Error) if the intervaloOfertado couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/intervalo-ofertados")
    @Timed
    public ResponseEntity<IntervaloOfertado> updateIntervaloOfertado(@RequestBody IntervaloOfertado intervaloOfertado) throws URISyntaxException {
        log.debug("REST request to update IntervaloOfertado : {}", intervaloOfertado);
        if (intervaloOfertado.getId() == null) {
            return createIntervaloOfertado(intervaloOfertado);
        }
        IntervaloOfertado result = intervaloOfertadoRepository.save(intervaloOfertado);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, intervaloOfertado.getId().toString()))
            .body(result);
    }

    /**
     * GET  /intervalo-ofertados : get all the intervaloOfertados.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of intervaloOfertados in body
     */
    @GetMapping("/intervalo-ofertados")
    @Timed
    public List<IntervaloOfertado> getAllIntervaloOfertados() {
        log.debug("REST request to get all IntervaloOfertados");
        return intervaloOfertadoRepository.findAll();
        }

    /**
     * GET  /intervalo-ofertados/:id : get the "id" intervaloOfertado.
     *
     * @param id the id of the intervaloOfertado to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the intervaloOfertado, or with status 404 (Not Found)
     */
    @GetMapping("/intervalo-ofertados/{id}")
    @Timed
    public ResponseEntity<IntervaloOfertado> getIntervaloOfertado(@PathVariable Long id) {
        log.debug("REST request to get IntervaloOfertado : {}", id);
        IntervaloOfertado intervaloOfertado = intervaloOfertadoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(intervaloOfertado));
    }

    ////-------------------------------------

    @GetMapping("/intervalo-ofertados/lineaTipo/{nombre}/{tipo}")
    @Timed
    public List<IntervaloOfertado> getIntervaloByLineaTipo(@PathVariable String nombre, @PathVariable TipoDia tipo) {
        log.debug("REST request to get Estacion by Linea and tipo: {}", nombre, tipo);
        return intervaloOfertadoRepository.findByLineaNombreAndTipoDia(nombre, tipo);
    }

    /**
     * DELETE  /intervalo-ofertados/:id : delete the "id" intervaloOfertado.
     *
     * @param id the id of the intervaloOfertado to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/intervalo-ofertados/{id}")
    @Timed
    public ResponseEntity<Void> deleteIntervaloOfertado(@PathVariable Long id) {
        log.debug("REST request to delete IntervaloOfertado : {}", id);
        intervaloOfertadoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
