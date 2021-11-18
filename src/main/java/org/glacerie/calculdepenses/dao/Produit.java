package org.glacerie.calculdepenses.dao;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="PRODUITS")
public class Produit {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    @Column(name="NOM")
    private String nom;
    @Column(name="MARQUE")
    private String marque;
    @Column(name="TYPE")
    private String type;
    @Column(name="PRIX")
    private Long prix;
    @Column(name="UNITE")
    private String unite;
    @OneToMany
    private List<Depense> depenses;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getMarque() {
        return marque;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getPrix() {
        return prix;
    }

    public void setPrix(Long prix) {
        this.prix = prix;
    }

    public String getUnité() {
        return unite;
    }

    public void setUnité(String unité) {
        this.unite = unité;
    }

    public List<Depense> getDepenses() {
        return depenses;
    }

    public void setDepenses(List<Depense> depenses) {
        this.depenses = depenses;
    }
}
