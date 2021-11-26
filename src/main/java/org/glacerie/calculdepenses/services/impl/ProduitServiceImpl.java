package org.glacerie.calculdepenses.services.impl;

import org.glacerie.calculdepenses.dao.Produit;
import org.glacerie.calculdepenses.repository.ProduitRepository;
import org.glacerie.calculdepenses.services.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduitServiceImpl implements ProduitService {

    @Autowired
    ProduitRepository produitRepository;
    @Override
    public Produit createProduit(Produit produit) {

        return produitRepository.save(produit);
    }
    @Override
    public Produit updateProduit(Produit produit) {

        return produitRepository.save(produit);
    }

    @Override
    public List<Produit> listProduit() {

        return produitRepository.findAll();
    }

    public void deleteProduct(Long id){
        Produit prd= new Produit();
        prd.setId(id);
        produitRepository.delete(prd);
    }
}
