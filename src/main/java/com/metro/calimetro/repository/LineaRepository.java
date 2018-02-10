package com.metro.calimetro.repository;

import com.metro.calimetro.domain.Linea;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Linea entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LineaRepository extends JpaRepository<Linea, Long> {

}
