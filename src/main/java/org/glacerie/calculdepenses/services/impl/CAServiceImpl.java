package org.glacerie.calculdepenses.services.impl;

import org.glacerie.calculdepenses.dao.ChiffreAffaire;
import org.glacerie.calculdepenses.repository.CARepository;
import org.glacerie.calculdepenses.services.CAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CAServiceImpl implements CAService {

    @Autowired
    private CARepository CARepository;
    @Override
    public ChiffreAffaire createRevenu(ChiffreAffaire chiffreAffaire) {

        return CARepository.save(chiffreAffaire);
    }

    @Override
    public List<ChiffreAffaire> listRevenu() {
        return CARepository.findAll();
    }

    @Override
    public void deleteRevenu(Long revenuId) {
            Optional<ChiffreAffaire> revenu = CARepository.findById(revenuId);
            CARepository.delete(revenu.get());
    }
}
