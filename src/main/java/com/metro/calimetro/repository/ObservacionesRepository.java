package com.metro.calimetro.repository;

import com.metro.calimetro.domain.Observaciones;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Observaciones entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ObservacionesRepository extends JpaRepository<Observaciones, Long> {

}
