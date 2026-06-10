package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Auteur;
import com.usmb.but3.td4biblio.entity.Livre;
import com.usmb.but3.td4biblio.service.LivreService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Menu;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import org.springframework.util.StringUtils;

@Route(value = "livre")
@PageTitle("Les Livres")
@Menu(title = "Les Livres", order = 5, icon = "vaadin:clipboard-check")
public class LivreView extends VerticalLayout {

	private final LivreService livreService;

	final Grid<Livre> grid;
	final TextField   filter;
	private final Button addNewBtn;

	public LivreView(LivreService livreService, LivreEditor editor) {
		this.livreService = livreService;
		this.grid   = new Grid<>(Livre.class);
		this.filter = new TextField();
		this.addNewBtn = new Button("Ajouter un livre", VaadinIcon.PLUS.create());

		setPadding(false);
		setSpacing(false);
		addClassName("biblio-page");

		var titleH2 = new H2("Les Livres");
		titleH2.addClassName("biblio-section-title");
		titleH2.getElement().getStyle().set("margin-bottom", "20px");

		filter.setPlaceholder("Filtrer par titre…");
		filter.getElement().getStyle().set("flex", "1");

		addNewBtn.addClassName("biblio-btn-primary");
		addNewBtn.getElement().getStyle()
				.set("background", "var(--amber)").set("color", "#1a1710")
				.set("border", "none").set("border-radius", "9px")
				.set("font-weight", "600").set("padding", "0 20px").set("cursor", "pointer");

		var actions = new HorizontalLayout(filter, addNewBtn);
		actions.setAlignItems(Alignment.CENTER);
		actions.setWidthFull();
		actions.getElement().getStyle().set("margin-bottom", "16px");

		add(titleH2, actions, grid, editor);

		grid.setHeight("340px");
		grid.setColumns("idDocument", "titre");

		grid.addColumn(livre -> {
			Auteur auteur = livre.getAuteur();
			return auteur != null ? auteur.getDesc() : "";
		}).setHeader("Auteur").setKey("auteurDescription");

		grid.addColumns("datePublication", "nbPages");

		grid.addColumn(livre ->
				livre.getEditeur() != null ? livre.getEditeur().getNomSociete() : ""
		).setHeader("Éditeur");

		grid.getColumnByKey("idDocument").setWidth("60px").setFlexGrow(0);

		filter.setValueChangeMode(ValueChangeMode.LAZY);
		filter.addValueChangeListener(e -> listLivres(e.getValue()));

		grid.asSingleSelect().addValueChangeListener(e -> editor.editLivre(e.getValue()));
		addNewBtn.addClickListener(e -> editor.editLivre(new Livre()));

		editor.setChangeHandler(() -> {
			editor.setVisible(false);
			listLivres(filter.getValue());
		});

		listLivres(null);
	}

	void listLivres(String filterText) {
		if (StringUtils.hasText(filterText)) {
			grid.setItems(livreService.getByTitreContainingIgnoreCase(filterText));
		} else {
			grid.setItems(livreService.getAllLivres());
		}
	}
}