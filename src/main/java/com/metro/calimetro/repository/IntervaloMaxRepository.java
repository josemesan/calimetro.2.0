package com.metro.calimetro.repository;

import com.metro.calimetro.domain.IntervaloMax;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.time.ZonedDateTime;
import java.util.List;


/**
 * Spring Data JPA repository for the IntervaloMax entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IntervaloMaxRepository extends JpaRepository<IntervaloMax, Long> {
    public List<IntervaloMax> findByHoraBetween (ZonedDateTime desde, ZonedDateTime hasta);
}
