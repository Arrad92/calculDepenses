package org.glacerie.calculdepenses.dao;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="CHIFFRE_AFFAIRES")
public class ChiffreAffaire {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    @Column(name="DATE_CA")
    private Date dateRevenu;
    @Column(name="MONTANT_CA")
    private Long amountRevenu;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDateRevenu() {
        return dateRevenu;
    }

    public void setDateRevenu(Date dateRevenu) {
        this.dateRevenu = dateRevenu;
    }

    public Long getAmountRevenu() {
        return amountRevenu;
    }

    public void setAmountRevenu(Long amountRevenu) {
        this.amountRevenu = amountRevenu;
    }
}
