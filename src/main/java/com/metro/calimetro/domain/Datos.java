package com.metro.calimetro.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Comparator;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Comparator;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Datos.
 */
@Entity
@Table(name = "datos")
public class Datos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_hora")
    private ZonedDateTime fechaHora;

    @Column(name = "intervalo_medio")
    private Integer intervaloMedio;

    @Column(name = "desviacion_media")
    private Integer desviacionMedia;

    @Column(name = "tiempo_vuelta")
    private Integer tiempoVuelta;

    @Column(name = "numero_trenes")
    private Integer numeroTrenes;

    @Column(name = "viajeros")
    private Integer viajeros;

    @Column(name = "toc")
    private Integer toc;

    @Column(name = "densidad")
    private Integer densidad;

    @Column(name = "consumo")
    private Integer consumo;

    @Column(name = "velocidad")
    private Integer velocidad;

    @Column(name = "coche_km")
    private Integer cocheKm;

    @ManyToOne
    private Linea linea;

    @OneToOne
    @JoinColumn(unique = true)
    private IntervaloMin intervaloMin;

    @OneToOne
    @JoinColumn(unique = true)
    private IntervaloMax intervaloMax;

    @OneToMany(mappedBy = "datos")
    @JsonIgnore
    private Set<Observaciones> observaciones = new HashSet<>();

    ///-------------------------------------------

    //--------------------------------
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getFechaHora() {
        return fechaHora;
    }

    public Datos fechaHora(ZonedDateTime fechaHora) {
        this.fechaHora = fechaHora;
        return this;
    }

    public void setFechaHora(ZonedDateTime fechaHora) {
        this.fechaHora = fechaHora;
    }

    public Integer getIntervaloMedio() {
        return intervaloMedio;
    }

    public Datos intervaloMedio(Integer intervaloMedio) {
        this.intervaloMedio = intervaloMedio;
        return this;
    }

    public void setIntervaloMedio(Integer intervaloMedio) {
        this.intervaloMedio = intervaloMedio;
    }

    public Integer getDesviacionMedia() {
        return desviacionMedia;
    }

    public Datos desviacionMedia(Integer desviacionMedia) {
        this.desviacionMedia = desviacionMedia;
        return this;
    }

    public void setDesviacionMedia(Integer desviacionMedia) {
        this.desviacionMedia = desviacionMedia;
    }

    public Integer getTiempoVuelta() {
        return tiempoVuelta;
    }

    public Datos tiempoVuelta(Integer tiempoVuelta) {
        this.tiempoVuelta = tiempoVuelta;
        return this;
    }

    public void setTiempoVuelta(Integer tiempoVuelta) {
        this.tiempoVuelta = tiempoVuelta;
    }

    public Integer getNumeroTrenes() {
        return numeroTrenes;
    }

    public Datos numeroTrenes(Integer numeroTrenes) {
        this.numeroTrenes = numeroTrenes;
        return this;
    }

    public void setNumeroTrenes(Integer numeroTrenes) {
        this.numeroTrenes = numeroTrenes;
    }

    public Integer getViajeros() {
        return viajeros;
    }

    public Datos viajeros(Integer viajeros) {
        this.viajeros = viajeros;
        return this;
    }

    public void setViajeros(Integer viajeros) {
        this.viajeros = viajeros;
    }

    public Integer getToc() {
        return toc;
    }

    public Datos toc(Integer toc) {
        this.toc = toc;
        return this;
    }

    public void setToc(Integer toc) {
        this.toc = toc;
    }

    public Integer getDensidad() {
        return densidad;
    }

    public Datos densidad(Integer densidad) {
        this.densidad = densidad;
        return this;
    }

    public void setDensidad(Integer densidad) {
        this.densidad = densidad;
    }

    public Integer getConsumo() {
        return consumo;
    }

    public Datos consumo(Integer consumo) {
        this.consumo = consumo;
        return this;
    }

    public void setConsumo(Integer consumo) {
        this.consumo = consumo;
    }

    public Integer getVelocidad() {
        return velocidad;
    }

    public Datos velocidad(Integer velocidad) {
        this.velocidad = velocidad;
        return this;
    }

    public void setVelocidad(Integer velocidad) {
        this.velocidad = velocidad;
    }

    public Integer getCocheKm() {
        return cocheKm;
    }

    public Datos cocheKm(Integer cocheKm) {
        this.cocheKm = cocheKm;
        return this;
    }

    public void setCocheKm(Integer cocheKm) {
        this.cocheKm = cocheKm;
    }

    public Linea getLinea() {
        return linea;
    }

    public Datos linea(Linea linea) {
        this.linea = linea;
        return this;
    }

    public void setLinea(Linea linea) {
        this.linea = linea;
    }

    public IntervaloMin getIntervaloMin() {
        return intervaloMin;
    }

    public Datos intervaloMin(IntervaloMin intervaloMin) {
        this.intervaloMin = intervaloMin;
        return this;
    }

    public void setIntervaloMin(IntervaloMin intervaloMin) {
        this.intervaloMin = intervaloMin;
    }

    public IntervaloMax getIntervaloMax() {
        return intervaloMax;
    }

    public Datos intervaloMax(IntervaloMax intervaloMax) {
        this.intervaloMax = intervaloMax;
        return this;
    }

    public void setIntervaloMax(IntervaloMax intervaloMax) {
        this.intervaloMax = intervaloMax;
    }

    public Set<Observaciones> getObservaciones() {
        return observaciones;
    }

    public Datos observaciones(Set<Observaciones> observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public Datos addObservaciones(Observaciones observaciones) {
        this.observaciones.add(observaciones);
        observaciones.setDatos(this);
        return this;
    }

    public Datos removeObservaciones(Observaciones observaciones) {
        this.observaciones.remove(observaciones);
        observaciones.setDatos(null);
        return this;
    }

    public void setObservaciones(Set<Observaciones> observaciones) {
        this.observaciones = observaciones;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Datos datos = (Datos) o;
        if (datos.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), datos.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Datos{" +
            "id=" + getId() +
            ", fechaHora='" + getFechaHora() + "'" +
            ", intervaloMedio=" + getIntervaloMedio() +
            ", desviacionMedia=" + getDesviacionMedia() +
            ", tiempoVuelta=" + getTiempoVuelta() +
            ", numeroTrenes=" + getNumeroTrenes() +
            ", viajeros=" + getViajeros() +
            ", toc=" + getToc() +
            ", densidad=" + getDensidad() +
            ", consumo=" + getConsumo() +
            ", velocidad=" + getVelocidad() +
            ", cocheKm=" + getCocheKm() +
            "}";
    }
}
