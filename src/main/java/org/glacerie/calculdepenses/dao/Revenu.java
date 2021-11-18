package org.glacerie.calculdepenses.dao;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name="REVENUS")
public class Revenu {
    @Id
    private Long id;
    @Column(name="DATE_REVENU")
    private Date dateRevenu;
    @Column(name="MONTANT_REVENU")
    private Long amountRevenu;

}
