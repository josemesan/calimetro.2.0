package com.metro.calimetro.repository;

import com.metro.calimetro.domain.IntervaloOfertado;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the IntervaloOfertado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IntervaloOfertadoRepository extends JpaRepository<IntervaloOfertado, Long> {

}
