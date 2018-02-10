package com.metro.calimetro.repository;

import com.metro.calimetro.domain.Estacion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Estacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstacionRepository extends JpaRepository<Estacion, Long> {

}
