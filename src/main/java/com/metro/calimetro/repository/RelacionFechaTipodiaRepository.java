package com.metro.calimetro.repository;

import com.metro.calimetro.domain.RelacionFechaTipodia;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RelacionFechaTipodia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RelacionFechaTipodiaRepository extends JpaRepository<RelacionFechaTipodia, Long> {

}
