package com.usmb.but3.td4biblio.view;

import com.usmb.but3.td4biblio.entity.Auteur;
import com.usmb.but3.td4biblio.service.AuteurService;
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

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
@Scope("prototype")
@Route(value = "auteur")
@PageTitle("Les Auteurs")
@Menu(title = "Les Auteurs", order = 4, icon = "vaadin:clipboard-check")
public class AuteurView extends VerticalLayout {

	private final AuteurService auteurService;

	final Grid<Auteur>  grid;
	final TextField     filter;
	private final Button addNewBtn;

	public Button getAddNewBtn() { return addNewBtn; }

	final AuteurEditor editor;

	public AuteurView(AuteurService auteurService, AuteurEditor editor) {
		this.auteurService = auteurService;
		this.editor = editor;
		this.grid   = new Grid<>(Auteur.class);
		this.filter = new TextField();
		this.addNewBtn = new Button("Ajouter un auteur", VaadinIcon.PLUS.create());

		setPadding(false);
		setSpacing(false);
		addClassName("biblio-page");

		// En-tête
		var titleH2 = new H2("Les Auteurs");
		titleH2.addClassName("biblio-section-title");
		titleH2.getElement().getStyle().set("margin-bottom", "20px");

		// Barre filtre + bouton
		filter.setPlaceholder("Filtrer par nom…");
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
		grid.setColumns("idAuteur", "nom", "prenom", "nationalite", "dateNaissance", "dateDeces");
		grid.getColumnByKey("idAuteur").setWidth("60px").setFlexGrow(0);

		filter.setValueChangeMode(ValueChangeMode.LAZY);
		filter.addValueChangeListener(e -> listAuteurs(e.getValue()));

		grid.asSingleSelect().addValueChangeListener(e -> editor.editAuteur(e.getValue()));

		addNewBtn.addClickListener(e -> editor.editAuteur(
				new Auteur(null, null, "", "", "", null, null, "", "", "")));

		editor.setChangeHandler(() -> {
			editor.setVisible(false);
			listAuteurs(filter.getValue());
		});

		listAuteurs(null);
	}

	void listAuteurs(String filterText) {
		if (StringUtils.hasText(filterText)) {
			grid.setItems(auteurService.getByNomContainingIgnoreCase(filterText));
		} else {
			grid.setItems(auteurService.getAllAuteurs());
		}
	}
}