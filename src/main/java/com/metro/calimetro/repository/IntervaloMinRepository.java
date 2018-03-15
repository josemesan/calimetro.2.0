package com.metro.calimetro.repository;

import com.metro.calimetro.domain.IntervaloMin;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.time.ZonedDateTime;
import java.util.List;


/**
 * Spring Data JPA repository for the IntervaloMin entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IntervaloMinRepository extends JpaRepository<IntervaloMin, Long> {
    public List<IntervaloMin> findByHoraBetween (ZonedDateTime desde, ZonedDateTime hasta);

}
