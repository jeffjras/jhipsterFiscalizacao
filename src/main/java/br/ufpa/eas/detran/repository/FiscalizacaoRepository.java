package br.ufpa.eas.detran.repository;

import br.ufpa.eas.detran.domain.Fiscalizacao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Fiscalizacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FiscalizacaoRepository extends JpaRepository<Fiscalizacao, Long> {

}
