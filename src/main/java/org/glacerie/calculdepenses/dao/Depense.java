package org.glacerie.calculdepenses.dao;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="DEPENSES")
public class Depense {
    @Id
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    private Produit produit;
    @Column(name="Quantity")
    private Long quantity;
    @Column(name="TotalPrice")
    private Long totalPrice;
    @Column(name="Date")
    private Date dateDepense;
}
