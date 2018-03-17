package com.metro.calimetro.repository;

import com.metro.calimetro.domain.RelacionFechaTipodia;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.time.LocalDate;
import java.util.List;


/**
 * Spring Data JPA repository for the RelacionFechaTipodia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RelacionFechaTipodiaRepository extends JpaRepository<RelacionFechaTipodia, Long> {
    public List<RelacionFechaTipodia> findByFecha(LocalDate fecha);
}
