/**
 * SAV Alvic Portal - Frontend Logic v3 (Clean) + PDF & Email Integration
 */

const state = {
    view: 'login',
    user: null,
    incidents: [],
    loading: false,
    language: localStorage.getItem('sav_lang') || 'es'
};

const userDatabase = {
    'admin@alvic.com': { pass: 'alvic2026', role: 'ADMIN', name: 'Admin', cliente: 'Alvic' },
    'cliente@bricodepot.com': { pass: 'bricoSAV', role: 'CLIENTE', name: 'Brico Depot', clientKey: 'bricodepot' },
    'cliente@intermarche.com': { pass: 'interSAV', role: 'CLIENTE', name: 'INTERMARCHÉ', clientKey: 'intermarche' },
    'cliente@castorama.com': { pass: 'castoSAV', role: 'CLIENTE', name: 'CASTORAMA', clientKey: 'castorama' },
    'cliente@edb.com': { pass: 'edbSAV', role: 'CLIENTE', name: 'EDB', clientKey: 'edb' },
    'mtziora@grupoalvic.com': { pass: 'malena', role: 'CLIENTE', name: 'Malena', clientKey: 'grupoalvic' }
};

const clientData = {
    'bricodepot': {
        name: 'Brico Depot',
        stores: ["A CORUÑA", "ALCALÁ", "ALMERÍA", "ALZIRA", "AVILÉS", "CABRERA", "CREVILLENTE", "FERROL", "GAIA", "GETAFE", "GRANADA", "JEREZ", "LEÓN", "LLEIDA", "LOURES", "MAJADAHONDA", "PALMA", "PAMPLONA", "PARETS", "QUART", "SAN SEBASTIAN", "SEVILLA NORTE", "SEVILLA SUR", "SINTRA", "TARRAGONA", "TOLEDO", "VALENCIA", "VALLADOLID", "VIANA", "VITORIA", "ZARAGOZA", "SAN FERNANDO"]
    },
    'intermarche': {
        name: 'INTERMARCHÉ',
        stores: [
            "AGDE", "AMBERIEU EN BUGEY", "ARGENTAN", "AURILLAC", "AVRANCHES", "BEAUPREAU EN MAUGES", "BERGERAC",
            "PIERRELATTE", "BOURG EN BRESSE", "CAVAILLON", "CHANAS", "CHANTONNAY", "CHATEAU D'OLONNE", "CHATELLERAULT",
            "CONCARNEAU", "FAMECK", "FLERS", "GAUCHY", "JUVIGNAC", "LISIEUX", "MORMANT", "NIORT", "POLLESTRES",
            "SABLE SUR SARTHE", "SAINT GEREON", "SAINT HILAIRE DE LOULAY - MONTAIGU", "SAINT PAIR SUR MER - GRANVILLE",
            "SAINT MARCEL", "THOUARS", "VANNES", "YVETOT", "ALES", "AMBERT", "AUMETZ", "BELLAC", "BITCHE", "BRANGES",
            "BRIGNOLES", "BRUYERES", "CARENTAN", "CHAMPAGNOLE", "CHATEAUBRIANT", "CHATEAUDUN", "COUTANCES", "COUTRAS",
            "CUSSET", "DOULLENS", "ERNEE", "ETALONDES", "FALAISE", "GARGAS", "GIEN CEDEX", "GRAULHET", "GUISE",
            "MUILLE VILLETTE", "HENNEBONT", "HOMECOURT", "ISSOUDUN", "JOINVILLE", "LA CHATRE", "LA FERTE MACE",
            "LA TESTE", "L'AIGLE", "LANTON", "LAVAL", "LE BREUIL", "LE FENOUILLER", "LE THILLOT", "LE TOUVET",
            "LUCON", "SENS", "MAMERS", "MIRECOURT", "MONTELIER", "MONTMOROT", "MORTAGNE AU PERCHE", "MOURENX",
            "NOGENT LE ROTROU", "NOYON", "OLORON SAINTE MARIE CEDEX", "ORVAL", "PARIGNY", "PEIPIN", "PERONNE",
            "PITHIVIERS LE VIEIL", "PLOERMEL", "PONT AUDEMER", "PROVINS", "REMIREMONT", "RIBERAC", "ROCHEFORT SUR MER",
            "SAINT PAUL LES ROMANS", "ROYE", "RUMILLY", "SAINT AGATHON", "SAINT JEAN D'ANGELY", "SAINT MAIXENT L'ECOLE",
            "SAINT MALO", "SAINT PHILBERT DE GRAND LIEU", "SAINT POL DE LEON", "SAINT VITE", "SEGRE EN ANJOU BLEU",
            "SERRES CASTET", "SAINT JEAN DE MUZOLS", "SAINT LEONARD", "SAINT LÔ", "SAINT POURCAIN SUR SIOULE",
            "SAINT SAUVEUR", "SAINT VALLIER", "TOUCY", "VARENNES VAUZELLES", "VENERQUE", "VERNEUIL SUR AVRE",
            "VITRE", "VITRY LE FRANCOIS", "YZEURES SUR CREUSE", "BONDY", "CHÂTEAU-THIERRY", "CHATTE", "EVREUX",
            "GAILLARD", "ISSOIRE", "JARDRES", "LIMOGES (I)", "MONTARGIS", "ORGEVAL", "ROYAN", "SILLINGY", "SOUSTONS",
            "CREYSSE BERGERAC", "BOLLENE", "CARCASSONNE", "MARMANDE", "MENDE", "NARBONNE", "PERPIGNAN", "PINEULH",
            "SALAISE SUR SANNE", "VALS-PRES-LE-PUY", "VIRY CHATILLON"
        ]
    },
    'grupoalvic': {
        name: 'Malena',
        stores: [
            "ALCAUDETE", "LA CAROLINA", "VIC", "MADRID", "BARCELONA", "VALENCIA", "MÁLAGA", "SEVILLA"
        ]
    },
    'castorama': {
        name: 'CASTORAMA',
        stores: [
            "AGEN", "AIX LES MILLES", "ANGLET", "ANGOULEME", "ANNECY", "ANTIBES", "AVIGNON", "BARENTIN 2", "BESANCON",
            "BEZIERS 2", "BLAGNAC", "BONDUES", "BORDEAUX 3 LORMONT", "BOURG EN BRESSE / VIRAT", "BOURGOIN", "BREST 3",
            "BRON", "CAEN 2 FLEURY", "CAP MALO", "CHALON SUR SAONE", "CHAMBOURCY 2", "CLAYE SOUILLY", "CLEMONT FERRAND / AUBIE",
            "CLICHY", "COIGNIÈRES", "COLMAR", "CORMEILLES", "CREIL / SAINT MAXIMIN 2", "CRETEIL", "DARDILLY", "DIJON",
            "DUNKERQUE", "ENGLOS 2", "FRÉJUS", "FRESNES", "GIVORS", "GONESSE / ROISSY", "GRENOBLE / ST MARTIN D'H",
            "HENIN", "HEROUVILLE", "KINGERSHEIM 2", "LA ROCHELLE", "LA SEYNE", "LE CANNET", "LE HARVE / GONVREVILLE",
            "LE MANS", "LES CLAYES SS BOIS", "LES ULIS", "LIMOGES / FEYTIAT", "MANDELIEU", "MELUN", "MERIGNAC 2", "METZ",
            "MONTGERON", "MONTPELLIER 2 / ST CLEMENT", "MONTPELLIER LATTES", "NANTES LA BEUJOIRE", "NANTES ORVALUT",
            "NATION", "NIMES 2", "NIORT", "OLIVERT", "ORMESSON", "PARIS GRENELLE", "PAU", "PERPIGNAN 2", "PIERRELAYE",
            "PLAN DE CAMP", "POITIERS 2", "PORTET SUR GARONNE", "QUIMPER 2", "REIMS", "RENNES ST JAQUES", "ROANNE",
            "SAVOIE / CHAMBERY", "ST LOUP", "ST NAZAIRE", "ST ORENS 2", "STRASBOURG", "TERVILLE", "TOULON LA GARDE 2",
            "TOULOUSE L UNION", "TOURS", "VALENCE", "VANDOEUVRE LES NANCY", "VANNES 2", "VILLABÉ", "VILLACOUBLAY / VELIZY",
            "VILLEMOMBLE", "VILLENAVE D'ORNON", "VITROLLES", "LORMONT", "RILLEUX"
        ]
    },
    'edb': {
        name: 'EDB',
        stores: [
            "COMBOIRE", "ALES", "MONTELIMAR SUD", "AUBENAS", "CHAMBERY", "NARBONNE", "PONTARLIER", "SIMC MANOSQUE",
            "ROMANS", "ANNEMASSE", "ANNECY", "THYEZ", "SIMC DRAGUIGNAN", "ARLES", "ALBERTVILLE", "SALLANCHES 2",
            "MARGENCEL", "ISLE D ABEAU", "MOIRANS", "ST MARTIN D HERES", "CHATEAU-THIERRY", "REIMREMONT",
            "FONTAINE LES DIJON", "CEINES", "GAP", "BRIANCON", "ST JEAN DE MAURIENNE", "THONON AMPHION",
            "LA TOUR DU PIN", "PONT DES BEAUVOISIN", "DRUMETTAZ", "CREUSOT", "CHAMPAGNOLE", "NIMES", "ST JULIEN",
            "MAGASIN EN LIGNE", "PRIVAS", "SIMC LORGUES", "BELLEGARDE"
        ]
    }
};

const translations = {
    es: {
        login_title: "Acceso Portal SAV", email: "Usuario", password: "Contraseña", login_btn: "Entrar al Portal", logout: "Cerrar Sesión",
        pending: "Pendientes", closed: "Cerradas", total: "Total", my_incidents: "Mis Incidencias", new_incident: "+ Nueva Incidencia",
        table_id: "ID", table_date: "Fecha", table_store: "Tienda", table_status: "Estado", table_action: "Acción", table_client: "Cliente",
        create_incident_title: "Nueva Incidencia", back_btn: "← Volver", store: "Tienda / Centro", contact: "Persona de Contacto",
        email_contact: "Email Contacto", order_num: "Nº Pedido (ej: SAP)", order_num_edb: "Número de documento (ej. Albarán de devolución)", batch_num: "Nº Lote", gama: "Modelo",
        ean: "EAN (Código Barras)", incident_type: "Tipo Incidencia", select_option: "Seleccione una opción",
        opt_trans: "Daño por transporte", opt_dmg: "Producto dañado (roto / rayado)", opt_mfg: "Defecto de fabricación",
        opt_qty: "Variación cantidad", opt_ref: "Producto incorrecto / Referencia errónea", opt_acc: "Falta de complementos / herrajes",
        opt_pkg: "Incidencia de embalaje", opt_other: "Otros (especificar)", specify_other: "Especifique otro tipo de incidencia",
        specify_gama: "Especifica el modelo",
        gama_opt_jit: "Puertas JIT", gama_opt_jit_atomia: "Puertas JIT ATOMIA", gama_opt_jit_palma: "Puertas JIT PALMA", gama_opt_jit_stock: "Puertas STOCK",
        gama_opt_encimeras: "Encimeras", gama_opt_otros: "Otros (especificar)",
        incident_desc: "Descripción detallada de la Incidencia",
        attachments: "Adjuntar PDF/Fotos (Mínimo 1)", send_btn: "Enviar Incidencia", cancel_btn: "Cancelar",
        detail_title: "Detalle de Incidencia", comments: "Comentarios", add_comment_placeholder: "Añadir un comentario...",
        send_comment_btn: "Enviar Comentario", detail_label: "Detalle", detail_store: "Tienda", detail_date: "Fecha",
        detail_status: "Estado", detail_client: "Cliente", detail_desc: "Descripción",
        detail_contact: "Contacto", detail_email: "Email", detail_order: "Nº Pedido", detail_batch: "Nº Lote",
        detail_gama: "Modelo", detail_ean: "EAN", detail_type: "Tipo",
        view_btn: "Ver", delete_btn: "Eliminar", delete_confirm: "¿Estás seguro de que deseas eliminar esta incidencia?", no_incidents: "No hay incidencias.", no_incidents_admin: "No hay incidencias globales.",
        success_msg: "¡Incidencia creada y resguardo en PDF enviado al correo!", sending_btn: "Enviando...",
        config_error: "Debes configurar la URL de Apps Script en app.js", send_error: "Error al enviar: ",
        status_recibida: "RECIBIDO", status_proceso: "EN PROCESO", status_cerrada: "RESUELTO", admin_display: "Administrador Alvic",
        login_error_invalid: "Usuario o contraseña incorrectos.",
        admin_panel: "Panel de Control Alvic", analytics_title: "Análisis de Incidencias",
        chart_top_stores: "Top 5 Tiendas con Incidencias", chart_product_issues: "Incidencias por Modelo",
        tab_incidents: "Incidents", tab_analytics: "Analíticas",
        filter_client: "Filtrar por Cliente", filter_type: "Filtrar por Motivo", all_clients: "Todos los clientes", all_types: "Todos los motivos",
        total_incidents: "Total Incidencias", most_reported_client: "Cliente con más incidencias", most_reported_store: "Tienda con más incidencias",
        chart_client_volume: "Distribución por Volumen de Cliente", chart_top_stores_full: "Top 10 Tiendas (Global)",
        chart_types_breakdown: "Desglose por Motivo de Incidencia", chart_products_breakdown: "Incidencias por Modelo"
    },
    en: {
        login_title: "SAV Portal Login", email: "Username", password: "Password", login_btn: "Login to Portal", logout: "Logout",
        pending: "Pending", closed: "Closed", total: "Total", my_incidents: "My Incidents", new_incident: "+ New Incident",
        table_id: "ID", table_date: "Date", table_store: "Store", table_status: "Status", table_action: "Action", table_client: "Client",
        create_incident_title: "New Incident", back_btn: "← Back", store: "Store / Center", contact: "Contact Person",
        email_contact: "Contact Email", order_num: "Order No. (e.g. SAP)", order_num_edb: "Document Number (e.g. Return Note)", batch_num: "Batch No.", gama: "Model",
        ean: "EAN (Barcode)", incident_type: "Incident Type", select_option: "Select an option",
        opt_trans: "Transport Damage", opt_dmg: "Damaged Product (broken / scratched)", opt_mfg: "Manufacturing Defect",
        opt_qty: "Quantity Variation", opt_ref: "Wrong Product / Reference", opt_acc: "Missing Accessories / Fittings",
        opt_pkg: "Packaging Incident", opt_other: "Others (specify)", specify_other: "Specify other type of incident",
        specify_gama: "Specify the model",
        gama_opt_jit: "JIT Doors", gama_opt_jit_atomia: "JIT ATOMIA Doors", gama_opt_jit_palma: "JIT PALMA Doors", gama_opt_jit_stock: "STOCK Doors",
        gama_opt_encimeras: "Worktops", gama_opt_otros: "Others (specify)",
        incident_desc: "Detailed Incident Description",
        attachments: "Attach PDF/Photos (Min 1)", send_btn: "Send Incident", cancel_btn: "Cancel",
        detail_title: "Incident Detail", comments: "Comments", add_comment_placeholder: "Add a comment...",
        send_comment_btn: "Send Comment", detail_label: "Detail", detail_store: "Store", detail_date: "Date",
        detail_status: "Status", detail_client: "Client", detail_desc: "Description",
        detail_contact: "Contact", detail_email: "Email", detail_order: "Order No.", detail_batch: "Batch No.",
        detail_gama: "Model", detail_ean: "EAN", detail_type: "Type",
        view_btn: "View", no_incidents: "No incidents found.", no_incidents_admin: "No global incidents found.",
        success_msg: "Incident created and PDF receipt sent to email!", sending_btn: "Sending...",
        config_error: "You must configure the Apps Script URL in app.js", send_error: "Error sending: ",
        status_recibida: "RECEIVED", status_proceso: "IN PROCESS", status_cerrada: "RESOLVED", admin_display: "Alvic Administrator",
        login_error_invalid: "Incorrect username or password.",
        admin_panel: "Alvic Control Panel", analytics_title: "Incident Analytics",
        chart_top_stores: "Top 5 Stores with Incidents", chart_product_issues: "Incidents by Model",
        tab_incidents: "Incidents", tab_analytics: "Analytics",
        filter_client: "Filter by Client", filter_type: "Filter by Reason", all_clients: "All Clients", all_types: "All Reasons",
        total_incidents: "Total Incidents", most_reported_client: "Top Incident Client", most_reported_store: "Top Incident Store",
        chart_client_volume: "Client Volume Distribution", chart_top_stores_full: "Top 10 Stores (Global)",
        chart_types_breakdown: "Incident Reason Breakdown", chart_products_breakdown: "Incidents by Model"
    },
    fr: {
        login_title: "Connexion au portail SAV", email: "Utilisateur", password: "Mot de passe", login_btn: "Se connecter au portail", logout: "Déconnexion",
        pending: "En attente", closed: "Fermé", total: "Total", my_incidents: "Mes Incidents", new_incident: "+ Nouvel Incident",
        table_id: "ID", table_date: "Date", table_store: "Magasin", table_status: "Statut", table_action: "Action", table_client: "Client",
        create_incident_title: "Nouvel Incident", back_btn: "← Retour", store: "Magasin / Centre", contact: "Personne de contact",
        email_contact: "Email de contact", order_num: "N° de commande (ex. SAP)", order_num_edb: "Numéro de document (ex. Bon de retour)", batch_num: "N° de lot", gama: "Modèle",
        ean: "EAN (Code à barres)", incident_type: "Type d'incident", select_option: "Sélectionnez une option",
        opt_trans: "Dommages de transport", opt_dmg: "Produit endommagé (cassé / rayé)", opt_mfg: "Défaut de fabrication",
        opt_qty: "Variation de quantité", opt_ref: "Mauvais produit / référence", opt_acc: "Ferrures manquantes",
        opt_pkg: "Incident d'emballage", opt_other: "Autres (préciser)", specify_other: "Spécifier un autre type d'incident",
        specify_gama: "Spécifiez le modèle",
        gama_opt_jit: "Portes JIT", gama_opt_jit_atomia: "Portes JIT ATOMIA", gama_opt_jit_palma: "Portes JIT PALMA", gama_opt_jit_stock: "Portes STOCK",
        gama_opt_encimeras: "Plans de travail", gama_opt_otros: "Autres (préciser)",
        incident_desc: "Description détaillée de l'incident",
        attachments: "Joindre PDF/Photos (Min 1)", send_btn: "Envoyer l'incident", cancel_btn: "Annuler",
        detail_title: "Détail de l'incident", comments: "Commentaires", add_comment_placeholder: "Ajouter un commentaire...",
        send_comment_btn: "Envoyer le commentaire", detail_label: "Détail", detail_store: "Magasin", detail_date: "Date",
        detail_status: "Statut", detail_client: "Client", detail_desc: "Description",
        detail_contact: "Contact", detail_email: "Email", detail_order: "Commande", detail_batch: "Lot",
        detail_gama: "Modèle", detail_ean: "EAN", detail_type: "Type",
        view_btn: "Voir", no_incidents: "Aucun incident trouvé.", no_incidents_admin: "Aucun incident global trouvé.",
        success_msg: "Incident créé et reçu PDF envoyé par e-mail!", sending_btn: "Envoi en cours...",
        config_error: "Vous devez configurer l'URL Apps Script dans app.js", send_error: "Erreur lors de l'envoi : ",
        status_recibida: "REÇU", status_proceso: "EN COURS", status_cerrada: "RÉSOLU", admin_display: "Admnistrateur Alvic",
        login_error_invalid: "Utilisateur ou mot de passe incorrect.",
        admin_panel: "Tableau de Bord Alvic", analytics_title: "Analyse des Incidents",
        chart_top_stores: "Top 5 Magasins avec Incidents", chart_product_issues: "Incidents par Modèle",
        tab_incidents: "Incidents", tab_analytics: "Analytique",
        filter_client: "Filtrer por Client", filter_type: "Filtrar por Motif", all_clients: "Tous les clients", all_types: "Tous les motifs",
        total_incidents: "Total des Incidents", most_reported_client: "Client avec le plus d'incidents", most_reported_store: "Magasin avec le plus d'incidents",
        chart_client_volume: "Distribution du volume par client", chart_top_stores_full: "Top 10 Magasins (Global)",
        chart_types_breakdown: "Répartition par motif d'incident", chart_products_breakdown: "Incidents par Modèle"
    }
};

let views = {};

function initViews() {
    views = {
        login: document.getElementById('login-view'),
        dashboard: document.getElementById('dashboard-view'),
        create: document.getElementById('create-view'),
        detail: document.getElementById('detail-view'),
        admin: document.getElementById('admin-view')
    };
}

window.changeLanguage = (lang) => {
    state.language = lang;
    localStorage.setItem('sav_lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        let key = el.getAttribute('data-i18n');
        if (key === 'order_num' && state.user?.cliente === 'EDB') key = 'order_num_edb';
        if (translations[lang] && translations[lang][key]) el.innerText = translations[lang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) el.placeholder = translations[lang][key];
    });
    const selL = document.getElementById('language-selector');
    const selLogin = document.getElementById('language-selector-login');
    if (selL) selL.value = lang;
    if (selLogin) selLogin.value = lang;
};

function showView(viewName) {
    if (!views[viewName]) return;
    Object.keys(views).forEach(v => views[v]?.classList.add('hidden'));
    views[viewName].classList.remove('hidden');
    state.view = viewName;
}

window.viewDetail = (id) => {
    const inc = state.incidents.find(i => i.id === id);
    if (!inc) return;
    const lang = state.language;
    const t = translations[lang];

    document.getElementById('detail-id-title').innerText = `${t.detail_label}: ${inc.id}`;
    const orderLbl = (inc.cliente === 'EDB') ? t.order_num_edb : t.detail_order;

    document.getElementById('detail-content').innerHTML = `
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; width:100%;">
            <div><strong>${t.detail_client}:</strong> ${inc.cliente || '-'}</div>
            <div><strong>${t.detail_store}:</strong> ${inc.tienda || '-'}</div>
            <div><strong>${t.detail_date}:</strong> ${inc.fecha}</div>
            <div><strong>${t.detail_status}:</strong> 
                <span class="status-badge ${(inc.estado || '').toUpperCase() === 'EN PROCESO' ? 'status-inprogress' : ((inc.estado || '').toUpperCase() === 'RESUELTO' || (inc.estado || '').toUpperCase() === 'CERRADA' ? 'status-closed' : 'status-received')}">
                    ${translations[lang][(inc.estado || '').toUpperCase().includes('RECIBID') ? 'status_recibida' :
            ((inc.estado || '').toUpperCase() === 'EN PROCESO' ? 'status_proceso' : 'status_cerrada')]}
                </span>
            </div>
            <div style="grid-column: 1/-1; border-top: 1px solid #eee; margin: 5px 0;"></div>
            <div><strong>${t.detail_contact}:</strong> ${inc.persona_contacto || '-'}</div>
            <div><strong>${t.detail_email}:</strong> ${inc.email_contacto || '-'}</div>
            <div><strong>${orderLbl}:</strong> ${inc.num_pedido || '-'}</div>
            <div><strong>${t.detail_batch}:</strong> ${inc.num_lote || '-'}</div>
            <div style="grid-column: 1/-1; border-top: 1px solid #eee; margin: 5px 0;"></div>
            <div><strong>${t.detail_gama}:</strong> ${inc.gama || '-'}</div>
            <div><strong>${t.detail_ean}:</strong> ${inc.ean || '-'}</div>
            <div style="grid-column: 1/-1;"><strong>${t.detail_type}:</strong> ${inc.tipo_incidencia || '-'}</div>
            <div style="grid-column: 1/-1; background: #f9f9f9; padding: 12px; border-radius: 8px;">
                <strong>${t.detail_desc}:</strong><br>
                <p style="margin-top:5px; white-space:pre-wrap; font-size:0.9rem;">${inc.desc_incidencia || '...'}</p>
            </div>
        </div>
    `;
    showView('detail');
    renderComments(inc);
};

function renderComments(inc) {
    const list = document.getElementById('comments-list');
    if (!list) return;
    list.innerHTML = '';

    const parseComments = (str) => str ? str.split('\n---\n').filter(Boolean) : [];
    const alvicComments = parseComments(inc.comentarios_alvic);
    const clientComments = parseComments(inc.comentarios_cliente);

    const all = [
        ...alvicComments.map(c => ({ text: c, type: 'alvic' })),
        ...clientComments.map(c => ({ text: c, type: 'client' }))
    ];

    if (all.length === 0) {
        list.innerHTML = `<p style="font-size: 0.8rem; color: var(--text-muted); text-align: center;">Sin comentarios.</p>`;
        return;
    }

    list.innerHTML = all.map(c => `
        <div style="background: ${c.type === 'alvic' ? 'rgba(184, 151, 100, 0.1)' : 'rgba(0,0,0,0.03)'}; 
                    padding: 8px 12px; border-radius: 6px; border-left: 3px solid ${c.type === 'alvic' ? 'var(--primary)' : '#ccc'};">
            <span style="font-size: 0.7rem; font-weight: 700; color: ${c.type === 'alvic' ? 'var(--primary)' : '#666'}; display: block; margin-bottom: 2px;">
                ${c.type === 'alvic' ? 'ALVIC' : 'CLIENTE'}
            </span>
            <p style="font-size: 0.85rem; margin: 0; white-space: pre-wrap;">${c.text}</p>
        </div>
    `).join('');
}

function populateStores() {
    const select = document.getElementById('tienda-select');
    if (!select || !state.user || !state.user.stores) return;
    const firstOption = select.options[0];
    select.innerHTML = '';
    select.appendChild(firstOption);
    state.user.stores.sort().forEach(store => {
        const opt = document.createElement('option');
        opt.value = store;
        opt.innerText = store;
        select.appendChild(opt);
    });
}

window.updateKPIs = () => {
    const myInc = state.incidents.filter(i => state.user?.role === 'ADMIN' ? true : i.cliente === state.user?.cliente);
    const closedStats = ['RESUELTO', 'CERRADA'];
    const closedCount = myInc.filter(i => closedStats.includes((i.estado || '').toUpperCase())).length;
    const pendingCount = myInc.length - closedCount;

    const elP = document.getElementById('kpi-pending');
    const elC = document.getElementById('kpi-closed');
    const elT = document.getElementById('kpi-total');

    if (elP) elP.innerText = pendingCount;
    if (elC) elC.innerText = closedCount;
    if (elT) elT.innerText = myInc.length;

    const adminTotal = document.getElementById('ana-total-incidents');
    if (adminTotal) adminTotal.innerText = state.incidents.length;
}

function renderIncidents() {
    const lang = state.language;
    const body = document.getElementById('incident-list-body');
    if (!body) return;

    const filtered = state.incidents.filter(i => state.user?.role === 'ADMIN' ? true : i.cliente === state.user?.cliente);

    body.innerHTML = filtered.map(inc => {
        let statusKey = 'status_recibida';
        let colorClass = 'status-received';
        const st = (inc.estado || '').toUpperCase();

        if (st === 'EN PROCESO') { statusKey = 'status_proceso'; colorClass = 'status-inprogress'; }
        else if (st === 'RESUELTO' || st === 'CERRADA') { statusKey = 'status_cerrada'; colorClass = 'status-closed'; }

        return `
            <tr>
                <td>${inc.id}</td>
                <td>${inc.fecha}</td>
                <td>${inc.tienda || '-'}</td>
                <td><span class="status-badge ${colorClass}">${translations[lang][statusKey]}</span></td>
                <td>
                    <div style="display: flex; gap: 6px;">
                        <button class="btn" onclick="viewDetail('${inc.id}')" style="font-size:0.75rem; padding: 4px 10px;">${translations[lang].view_btn}</button>
                        <button class="btn" onclick="deleteIncident('${inc.id}')" style="font-size:0.75rem; padding: 4px 10px; border-color: rgba(220, 53, 69, 0.4); color: #dc2626;">${translations[lang].delete_btn}</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('') || `<tr><td colspan="5" style="padding: 40px; text-align: center; color: var(--text-muted);">${translations[lang].no_incidents}</td></tr>`;
}

function renderAdminIncidents() {
    const lang = state.language;
    const body = document.getElementById('admin-incident-list');
    if (!body) return;
    const statuses = [
        { val: 'RECIBIDO', key: 'status_recibida' },
        { val: 'EN PROCESO', key: 'status_proceso' },
        { val: 'RESUELTO', key: 'status_cerrada' }
    ];

    body.innerHTML = state.incidents.map(inc => `
        <tr>
            <td>${inc.id}</td>
            <td>${inc.fecha}</td>
            <td>${inc.cliente || '-'}</td>
            <td>
                <select class="status-select" onchange="updateIncidentStatus('${inc.id}', this.value)" style="padding: 4px; border-radius: 4px; border: 1px solid var(--card-border); font-size: 0.85rem; background: #fff; color: var(--text-color);">
                    ${statuses.map(s => {
        const st = (inc.estado || '').toUpperCase();
        let selected = st === s.val;
        if (s.val === 'RECIBIDO' && st.includes('RECIBID')) selected = true;
        if (s.val === 'RESUELTO' && (st === 'CERRADA' || st === 'RESUELTO')) selected = true;
        return `<option value="${s.val}" ${selected ? 'selected' : ''}>${translations[lang][s.key]}</option>`;
    }).join('')}
                </select>
            </td>
            <td>
                <div style="display: flex; gap: 6px;">
                    <button class="btn" onclick="viewDetail('${inc.id}')" style="font-size:0.75rem; padding: 4px 10px;">${translations[lang].view_btn}</button>
                    <button class="btn" onclick="deleteIncident('${inc.id}')" style="font-size:0.75rem; padding: 4px 10px; border-color: rgba(220, 53, 69, 0.4); color: #dc2626;">${translations[lang].delete_btn}</button>
                </div>
            </td>
        </tr>
    `).join('') || `<tr><td colspan="5" style="padding: 40px; text-align: center; color: var(--text-muted);">${translations[lang].no_incidents_admin}</td></tr>`;
}

window.updateIncidentStatus = async (id, newStatus) => {
    const inc = state.incidents.find(i => i.id === id);
    if (!inc) return;
    inc.estado = newStatus;
    const payload = { action: 'updateStatus', payload: { id: id, status: newStatus } };

    try {
        await fetch(APP_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } catch (err) { console.error('Error al actualizar estado:', err); }
};

window.deleteIncident = async (id) => {
    const lang = state.language;
    if (!confirm(translations[lang].delete_confirm)) return;

    const payload = { action: 'deleteIncident', payload: { id: id } };
    try {
        state.incidents = state.incidents.filter(i => i.id !== id);
        renderIncidents();
        if (state.user.role === 'ADMIN') renderAdminIncidents();
        updateKPIs();
        await fetch(APP_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } catch (err) {
        alert('Error al eliminar: ' + err.message);
        loadIncidents().then(() => {
            renderIncidents();
            if (state.user.role === 'ADMIN') renderAdminIncidents();
            updateKPIs();
        });
    }
};

// --- ANALYTICS ---
let charts = {};

function switchAdminTab(tab) {
    const listBtn = document.getElementById('tab-btn-list');
    const anaBtn = document.getElementById('tab-btn-analytics');
    const listContent = document.getElementById('admin-list-content');
    const anaContent = document.getElementById('admin-analytics-content');

    if (tab === 'list') {
        listBtn.classList.add('active-tab'); anaBtn.classList.remove('active-tab');
        listContent.classList.remove('hidden'); anaContent.classList.add('hidden');
    } else {
        listBtn.classList.remove('active-tab'); anaBtn.classList.add('active-tab');
        listContent.classList.add('hidden'); anaContent.classList.remove('hidden');
        initAdvancedAnalytics();
    }
}

function initAdvancedAnalytics() {
    const filterClient = document.getElementById('filter-client');
    const filterType = document.getElementById('filter-type');

    if (filterClient.options.length <= 1) {
        const clients = [...new Set(state.incidents.map(i => i.cliente))].sort();
        clients.forEach(c => {
            const opt = document.createElement('option'); opt.value = c; opt.innerText = c;
            filterClient.appendChild(opt);
        });
        const types = [...new Set(state.incidents.map(i => i.tipo_incidencia || 'Otros'))].sort();
        types.forEach(t => {
            const opt = document.createElement('option'); opt.value = t; opt.innerText = t;
            filterType.appendChild(opt);
        });
        filterClient.addEventListener('change', updateAnalytics);
        filterType.addEventListener('change', updateAnalytics);
    }
    updateAnalytics();
}

function updateAnalytics() {
    const clientVal = document.getElementById('filter-client').value;
    const typeVal = document.getElementById('filter-type').value;

    const filtered = state.incidents.filter(inc => {
        const matchClient = clientVal === 'all' || inc.cliente === clientVal;
        const matchType = typeVal === 'all' || (inc.tipo_incidencia || 'Otros') === typeVal;
        return matchClient && matchType;
    });

    document.getElementById('ana-total-incidents').innerText = filtered.length;

    const clientCounts = {}; const storeCounts = {}; const typeCounts = {}; const productCounts = {};

    filtered.forEach(inc => {
        clientCounts[inc.cliente] = (clientCounts[inc.cliente] || 0) + 1;
        storeCounts[inc.tienda] = (storeCounts[inc.tienda] || 0) + 1;
        const t = inc.tipo_incidencia || 'Otros';
        typeCounts[t] = (typeCounts[t] || 0) + 1;
        if (inc.gama) productCounts[inc.gama] = (productCounts[inc.gama] || 0) + 1;
    });

    const topClient = Object.entries(clientCounts).sort((a, b) => b[1] - a[1])[0] || ['-', 0];
    const topStore = Object.entries(storeCounts).sort((a, b) => b[1] - a[1])[0] || ['-', 0];

    document.getElementById('ana-critical-client').innerText = topClient[0];
    document.getElementById('ana-critical-store').innerText = topStore[0];

    renderChart('chart-clients', 'doughnut', Object.keys(clientCounts), Object.values(clientCounts), 'Clients');
    const top10Stores = Object.entries(storeCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
    renderChart('chart-stores-full', 'bar', top10Stores.map(s => s[0]), top10Stores.map(s => s[1]), translations[state.language].total);
    renderChart('chart-types-full', 'polarArea', Object.keys(typeCounts), Object.values(typeCounts), 'Incident Types');
    renderChart('chart-products-full', 'doughnut', Object.keys(productCounts), Object.values(productCounts), 'Products');
}

function renderChart(canvasId, type, labels, data, label) {
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) return;
    if (charts[canvasId]) charts[canvasId].destroy();

    const colors = [
        'rgba(184, 151, 100, 0.7)', 'rgba(142, 122, 106, 0.7)', 'rgba(212, 196, 175, 0.7)',
        'rgba(82, 72, 63, 0.7)', 'rgba(184, 151, 100, 0.4)', 'rgba(142, 122, 106, 0.4)',
        'rgba(165, 142, 104, 0.7)', 'rgba(110, 95, 80, 0.7)', 'rgba(230, 220, 200, 0.7)', 'rgba(60, 50, 40, 0.7)'
    ];

    charts[canvasId] = new Chart(ctx, {
        type: type,
        data: { labels: labels, datasets: [{ label: label, data: data, backgroundColor: colors, borderColor: '#fff', borderWidth: 1 }] },
        options: { responsive: true, maintainAspectRatio: true, aspectRatio: 2, plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10 } } } }, scales: type === 'bar' ? { y: { beginAtZero: true, ticks: { stepSize: 1 } } } : {} }
    });
}

// --- CONFIGURACIÓN ---
const APP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyQ-tBnob9xfUvqJ6Y7zUp_QnxJXLBN6ICafI6PeHx7d4SMqcosjPrXlZ18CScdH2T_QA/exec';

let selectedFiles = [];

document.addEventListener('DOMContentLoaded', () => {
    initViews();
    changeLanguage(state.language);

    document.getElementById('login-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.toLowerCase();
        const pass = document.getElementById('login-pass').value;
        const lang = state.language;
        const errorContainer = document.getElementById('login-error-container');
        const errorText = document.getElementById('login-error-text');

        const user = userDatabase[email];
        if (!user || user.pass !== pass) {
            errorText.innerText = translations[lang].login_error_invalid;
            errorContainer.classList.remove('hidden');
            return;
        }

        errorContainer.classList.add('hidden');
        state.user = { email, ...user };

        await loadIncidents();

        if (state.user.role === 'ADMIN') {
            document.getElementById('admin-display').innerText = translations[lang].admin_display;
            switchAdminTab('list');
            renderAdminIncidents();
            showView('admin');
        } else {
            const clientInfo = clientData[state.user.clientKey];
            if (clientInfo) {
                state.user.cliente = clientInfo.name;
                state.user.stores = clientInfo.stores;
            }
            document.getElementById('user-display').innerText = `${state.user.name} (${state.user.cliente})`;
            updateKPIs();
            renderIncidents();
            changeLanguage(state.language);
            showView('dashboard');
        }
    });

    [document.getElementById('logout-btn'), document.getElementById('logout-btn-admin')].forEach(btn =>
        btn?.addEventListener('click', () => {
            state.user = null;
            Object.values(charts).forEach(c => c?.destroy());
            charts = {};
            changeLanguage(state.language);
            showView('login');
        }));

    document.getElementById('new-incident-btn')?.addEventListener('click', () => {
        populateStores();
        showView('create');
    });
    document.getElementById('back-to-dash')?.addEventListener('click', () => showView('dashboard'));
    document.getElementById('back-to-dash-from-detail')?.addEventListener('click', () => showView(state.user?.role === 'ADMIN' ? 'admin' : 'dashboard'));
    document.getElementById('cancel-create')?.addEventListener('click', () => showView('dashboard'));

    document.getElementById('incident-type-select')?.addEventListener('change', (e) => {
        const otros = document.getElementById('otros-tipo-group');
        otros.classList.toggle('hidden', e.target.value !== 'Otros');
        document.getElementById('tipo-incidencia-otros').required = (e.target.value === 'Otros');
    });

    document.getElementById('gama-select')?.addEventListener('change', (e) => {
        const otros = document.getElementById('otros-gama-group');
        otros.classList.toggle('hidden', e.target.value !== 'Otros');
        document.getElementById('gama-otros-input').required = (e.target.value === 'Otros');
    });

    // ----------------------------------------------------------------------------------
    // NUEVA LÓGICA DE ENVÍO DE FORMULARIO (CON BASE64 PARA ADJUNTOS)
    // ----------------------------------------------------------------------------------
    document.getElementById('incident-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        const lang = state.language;
        const oldText = btn.innerText;

        btn.innerText = translations[lang].sending_btn;
        btn.disabled = true;

        try {
            const formData = new FormData(e.target);
            const vals = Object.fromEntries(formData.entries());

            if (vals.tipo_incidencia === 'Otros') vals.tipo_incidencia = `Otros: ${vals.tipo_incidencia_otros}`;
            if (vals.gama === 'Otros') vals.gama = `Otros: ${vals.gama_otros}`;

            // Procesar archivos a Base64
            const fileInput = document.getElementById('file-attachments');
            const files = fileInput.files;
            const filesBase64 = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const base64 = await toBase64(file);
                const base64Data = base64.split(',')[1];
                filesBase64.push({ name: file.name, type: file.type, base64: base64Data });
            }

            // AQUI ESTÁ EL CAMBIO IMPORTANTE: SE AÑADE usuario_email: state.user.email
            const payload = { action: 'createIncident', payload: { ...vals, cliente: state.user.cliente, usuario_email: state.user.email, lang: lang, files: filesBase64 } };

            // Usamos POST estándar sin no-cors para poder leer el JSON de respuesta
            const response = await fetch(APP_SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { "Content-Type": "text/plain;charset=utf-8" }
            });

            const result = await response.json();

            if (result.status === 'success') {
                showToast(translations[lang].success_msg, 'success');

                // Actualizar estado local
                state.incidents.unshift({
                    id: result.id || `ALVIC-${Date.now()}`,
                    fecha: new Date().toLocaleDateString(),
                    estado: 'RECIBIDO',
                    cliente: state.user.cliente,
                    ...vals
                });
                updateKPIs();
                renderIncidents();
                showView('dashboard');
                e.target.reset();
            } else {
                alert(translations[lang].send_error + result.message);
            }

        } catch (err) {
            alert(translations[lang].send_error + err.message);
        } finally {
            btn.innerText = oldText;
            btn.disabled = false;
        }
    });

    document.getElementById('add-comment-btn')?.addEventListener('click', async () => {
        const input = document.getElementById('new-comment');
        const text = input.value.trim();
        if (!text) return;

        const detailTitle = document.getElementById('detail-id-title').innerText;
        const id = detailTitle.split(': ')[1];
        const inc = state.incidents.find(i => i.id === id);
        if (!inc) return;

        const payload = { action: 'addComment', payload: { id: id, text: text, role: state.user.role } };

        try {
            input.value = '';
            const timestamp = new Date().toLocaleString();
            const formatted = `[${timestamp}]: ${text}`;
            if (state.user.role === 'ADMIN') {
                inc.comentarios_alvic = (inc.comentarios_alvic || "") + (inc.comentarios_alvic ? "\n---\n" : "") + formatted;
            } else {
                inc.comentarios_cliente = (inc.comentarios_cliente || "") + (inc.comentarios_cliente ? "\n---\n" : "") + formatted;
            }
            renderComments(inc);

            await fetch(APP_SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        } catch (err) { console.error('Error al enviar comentario:', err); }
    });
});

async function loadIncidents() {
    try {
        const resp = await fetch(`${APP_SCRIPT_URL}?action=getIncidents`);
        const data = await resp.json();
        if (Array.isArray(data)) state.incidents = data;
    } catch (err) { console.error('Error cargando incidencias', err); }
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const textNode = document.createElement('span');
    textNode.innerText = message;
    toast.appendChild(textNode);
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('fade-out');
        toast.addEventListener('animationend', () => toast.remove());
    }, 5000);
}

// Helper para Base64
function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}