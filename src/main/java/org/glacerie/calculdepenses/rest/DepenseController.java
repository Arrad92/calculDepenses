package org.glacerie.calculdepenses.rest;

import org.glacerie.calculdepenses.dao.Depense;
import org.glacerie.calculdepenses.services.DepenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/Depense")
public class DepenseController {
    @Autowired
    private DepenseService depenseService;
    @PostMapping("/create")
    public Depense createDepense(@RequestBody Depense depenseDTO){

        return depenseService.createDepense(depenseDTO);
    }

    @PostMapping("/all")
    public List<Depense> listDepenses(){
        return depenseService.listDepense();
    }

    @PostMapping("/delete")
    public String deleteProduit (@RequestParam Long id){
        try{
            depenseService.deleteDepense(id);
            return "success";
        }catch(Exception e){
            return e.getMessage();
        }
    }
}
