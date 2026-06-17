package com.usmb.but3.td4biblio.view;

import com.github.mvysny.kaributesting.v10.MockVaadin;
import com.github.mvysny.kaributesting.v10.Routes;
import com.github.mvysny.kaributesting.v10.spring.MockSpringServlet;
import com.usmb.but3.td4biblio.entity.Utilisateur;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.server.VaadinSession;
import com.vaadin.flow.spring.SpringServlet;
import kotlin.jvm.functions.Function0;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

/**
 * Classe de base pour les tests « browserless » des vues Vaadin (Karibu-Testing).
 *
 * <p>Démarre le contexte Spring complet (sur une base H2 en mémoire, pour ne pas
 * dépendre du PostgreSQL de production), puis branche Karibu sur ce contexte via
 * {@link MockSpringServlet}. Chaque vue est ainsi instanciée par Spring lors de la
 * navigation, avec ses dépendances injectées (réelles ou remplacées par des
 * {@code @MockitoBean} dans les sous-classes).</p>
 *
 * <p>Le serveur web n'est pas démarré ({@code webEnvironment = MOCK} par défaut) :
 * tout se passe en mémoire, sans navigateur ni HTTP.</p>
 */
@SpringBootTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:viewtest;DB_CLOSE_DELAY=-1",
        "spring.datasource.driverClassName=org.h2.Driver",
        "spring.datasource.username=sa",
        "spring.datasource.password=",
        "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect"
})
public abstract class AbstractViewTest {

    /** Découverte unique des routes (@Route) de l'application. */
    private static final Routes routes =
            new Routes().autoDiscoverViews("com.usmb.but3.td4biblio");

    @Autowired
    protected ApplicationContext ctx;

    @BeforeEach
    void setupVaadin() {
        final Function0<UI> uiFactory = UI::new;
        final SpringServlet servlet = new MockSpringServlet(routes, ctx, uiFactory);
        MockVaadin.setup(uiFactory, servlet);
    }

    @AfterEach
    void tearDownVaadin() {
        MockVaadin.tearDown();
    }

    /** Place {@code utilisateur} en session pour simuler une connexion. */
    protected void connecter(Utilisateur utilisateur) {
        VaadinSession.getCurrent().setAttribute(Utilisateur.class, utilisateur);
    }
}
