package com.metro.calimetro.repository;

import com.metro.calimetro.domain.TablaTrenes;
import com.metro.calimetro.domain.enumeration.TipoDia;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the TablaTrenes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TablaTrenesRepository extends JpaRepository<TablaTrenes, Long> {
    public List<TablaTrenes> findByLineaNombreAndTipoDia(String linea, TipoDia tipoDia);
}
