package org.glacerie.calculdepenses.rest;


import org.glacerie.calculdepenses.dao.ChiffreAffaire;
import org.glacerie.calculdepenses.services.CAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Revenu")
public class CAController {

    @Autowired
    private CAService CAService;

    @PostMapping("/create")
    public ChiffreAffaire createRevenu(@RequestBody ChiffreAffaire chiffreAffaire){
        return CAService.createRevenu(chiffreAffaire);
    }

    @PostMapping("/all")
    public List<ChiffreAffaire> listAll (){
        return CAService.listRevenu();
    }

    @PostMapping("/delete")
    public void delete(@RequestParam Long id){
             CAService.deleteRevenu(id);
    }
}
