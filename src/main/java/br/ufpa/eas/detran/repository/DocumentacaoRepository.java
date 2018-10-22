package br.ufpa.eas.detran.repository;

import br.ufpa.eas.detran.domain.Documentacao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Documentacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentacaoRepository extends JpaRepository<Documentacao, Long> {

}
