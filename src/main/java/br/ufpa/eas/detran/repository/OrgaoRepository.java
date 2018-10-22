package br.ufpa.eas.detran.repository;

import br.ufpa.eas.detran.domain.Orgao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Orgao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrgaoRepository extends JpaRepository<Orgao, Long> {

}
