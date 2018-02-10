package com.metro.calimetro.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Linea.
 */
@Entity
@Table(name = "linea")
public class Linea implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "visible")
    private Boolean visible;

    @OneToMany(mappedBy = "linea")
    @JsonIgnore
    private Set<Estacion> estacions = new HashSet<>();

    @OneToMany(mappedBy = "linea")
    @JsonIgnore
    private Set<Datos> datos = new HashSet<>();

    @OneToMany(mappedBy = "linea")
    @JsonIgnore
    private Set<TablaTrenes> tablaTrenes = new HashSet<>();

    @OneToMany(mappedBy = "linea")
    @JsonIgnore
    private Set<IntervaloOfertado> intervaloOfertados = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Linea nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Boolean isVisible() {
        return visible;
    }

    public Linea visible(Boolean visible) {
        this.visible = visible;
        return this;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public Set<Estacion> getEstacions() {
        return estacions;
    }

    public Linea estacions(Set<Estacion> estacions) {
        this.estacions = estacions;
        return this;
    }

    public Linea addEstacion(Estacion estacion) {
        this.estacions.add(estacion);
        estacion.setLinea(this);
        return this;
    }

    public Linea removeEstacion(Estacion estacion) {
        this.estacions.remove(estacion);
        estacion.setLinea(null);
        return this;
    }

    public void setEstacions(Set<Estacion> estacions) {
        this.estacions = estacions;
    }

    public Set<Datos> getDatos() {
        return datos;
    }

    public Linea datos(Set<Datos> datos) {
        this.datos = datos;
        return this;
    }

    public Linea addDatos(Datos datos) {
        this.datos.add(datos);
        datos.setLinea(this);
        return this;
    }

    public Linea removeDatos(Datos datos) {
        this.datos.remove(datos);
        datos.setLinea(null);
        return this;
    }

    public void setDatos(Set<Datos> datos) {
        this.datos = datos;
    }

    public Set<TablaTrenes> getTablaTrenes() {
        return tablaTrenes;
    }

    public Linea tablaTrenes(Set<TablaTrenes> tablaTrenes) {
        this.tablaTrenes = tablaTrenes;
        return this;
    }

    public Linea addTablaTrenes(TablaTrenes tablaTrenes) {
        this.tablaTrenes.add(tablaTrenes);
        tablaTrenes.setLinea(this);
        return this;
    }

    public Linea removeTablaTrenes(TablaTrenes tablaTrenes) {
        this.tablaTrenes.remove(tablaTrenes);
        tablaTrenes.setLinea(null);
        return this;
    }

    public void setTablaTrenes(Set<TablaTrenes> tablaTrenes) {
        this.tablaTrenes = tablaTrenes;
    }

    public Set<IntervaloOfertado> getIntervaloOfertados() {
        return intervaloOfertados;
    }

    public Linea intervaloOfertados(Set<IntervaloOfertado> intervaloOfertados) {
        this.intervaloOfertados = intervaloOfertados;
        return this;
    }

    public Linea addIntervaloOfertado(IntervaloOfertado intervaloOfertado) {
        this.intervaloOfertados.add(intervaloOfertado);
        intervaloOfertado.setLinea(this);
        return this;
    }

    public Linea removeIntervaloOfertado(IntervaloOfertado intervaloOfertado) {
        this.intervaloOfertados.remove(intervaloOfertado);
        intervaloOfertado.setLinea(null);
        return this;
    }

    public void setIntervaloOfertados(Set<IntervaloOfertado> intervaloOfertados) {
        this.intervaloOfertados = intervaloOfertados;
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
        Linea linea = (Linea) o;
        if (linea.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), linea.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Linea{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", visible='" + isVisible() + "'" +
            "}";
    }
}
