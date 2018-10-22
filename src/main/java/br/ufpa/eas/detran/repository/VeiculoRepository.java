package br.ufpa.eas.detran.repository;

import br.ufpa.eas.detran.domain.Veiculo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Veiculo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {

}
