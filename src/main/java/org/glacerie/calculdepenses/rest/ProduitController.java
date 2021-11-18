package org.glacerie.calculdepenses.rest;

import org.glacerie.calculdepenses.dao.Produit;
import org.glacerie.calculdepenses.dao.User;
import org.glacerie.calculdepenses.services.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/Produit")
public class ProduitController {

    @Autowired
    private ProduitService produitService;
    @PostMapping("/create")
    public Produit createProduit(@RequestBody Produit produitDTO){

        return produitService.createProduit(produitDTO);
    }

    @PostMapping("/all")
    public List<Produit> listProduit(){
        return produitService.listProduit();
    }
}
