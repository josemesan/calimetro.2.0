package com.metro.calimetro.repository;

import com.metro.calimetro.domain.Datos;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.time.ZonedDateTime;
import java.util.List;

import com.metro.calimetro.domain.TablaTrenes;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.time.ZonedDateTime;
import java.util.List;



/**
 * Spring Data JPA repository for the Datos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DatosRepository extends JpaRepository<Datos, Long> {
    public List<Datos> findByFechaHoraBetween (ZonedDateTime desde, ZonedDateTime hasta);
    public List<Datos> findByFechaHoraBetweenAndLineaNombre(ZonedDateTime desde,
                                                         ZonedDateTime hasta,
                                                         String linea);
}


