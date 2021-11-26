package org.glacerie.calculdepenses.services.impl;

import org.glacerie.calculdepenses.dao.Depense;
import org.glacerie.calculdepenses.repository.DepenseRepository;
import org.glacerie.calculdepenses.services.DepenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepenseServiceImpl implements DepenseService {

    @Autowired
    private DepenseRepository depenseRepository;
    @Override
    public Depense createDepense(Depense depense) {
        return depenseRepository.saveAndFlush(depense);
    }

    @Override
    public List<Depense> listDepense() {
        return depenseRepository.findAll();
    }

    @Override
    public void deleteDepense(Long id) {
            Depense depense = new Depense();
            depense.setId(id);
            depenseRepository.delete(depense);
    }
}
