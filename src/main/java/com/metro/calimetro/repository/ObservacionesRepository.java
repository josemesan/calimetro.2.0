package com.metro.calimetro.repository;

import com.metro.calimetro.domain.Observaciones;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.time.ZonedDateTime;
import java.util.List;

/**
 * Spring Data JPA repository for the Observaciones entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ObservacionesRepository extends JpaRepository<Observaciones, Long> {
    public List<Observaciones> findByDatos_Id(long dato);
    public List<Observaciones> findByDatos_FechaHoraBetween (ZonedDateTime desde, ZonedDateTime hasta);

}
