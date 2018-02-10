package com.metro.calimetro.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Observaciones.
 */
@Entity
@Table(name = "observaciones")
public class Observaciones implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "texto")
    private String texto;

    @ManyToOne
    private Datos datos;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTexto() {
        return texto;
    }

    public Observaciones texto(String texto) {
        this.texto = texto;
        return this;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Datos getDatos() {
        return datos;
    }

    public Observaciones datos(Datos datos) {
        this.datos = datos;
        return this;
    }

    public void setDatos(Datos datos) {
        this.datos = datos;
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
        Observaciones observaciones = (Observaciones) o;
        if (observaciones.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), observaciones.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Observaciones{" +
            "id=" + getId() +
            ", texto='" + getTexto() + "'" +
            "}";
    }
}
