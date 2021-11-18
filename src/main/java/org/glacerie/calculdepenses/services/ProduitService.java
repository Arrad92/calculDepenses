package org.glacerie.calculdepenses.services;

import org.glacerie.calculdepenses.dao.Produit;

import java.util.List;

public interface ProduitService {
    Produit createProduit(Produit produit);
    List<Produit> listProduit();
}
