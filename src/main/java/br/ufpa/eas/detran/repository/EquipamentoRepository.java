package br.ufpa.eas.detran.repository;

import br.ufpa.eas.detran.domain.Equipamento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Equipamento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EquipamentoRepository extends JpaRepository<Equipamento, Long> {

}
