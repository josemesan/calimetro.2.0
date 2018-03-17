package com.metro.calimetro.repository;

import com.metro.calimetro.domain.IntervaloOfertado;
import com.metro.calimetro.domain.enumeration.TipoDia;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the IntervaloOfertado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IntervaloOfertadoRepository extends JpaRepository<IntervaloOfertado, Long> {
    public List<IntervaloOfertado> findByLineaNombreAndTipoDia(String linea, TipoDia tipoDia);
}
