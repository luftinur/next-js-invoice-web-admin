import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Locale = "en" | "es" | "fr" | "de" | "ja" | "zh";

export type TranslationKey =
  | "nav.dashboard"
  | "nav.invoices"
  | "nav.customers"
  | "nav.payments"
  | "nav.settings"
  | "common.search"
  | "common.save"
  | "common.cancel"
  | "common.delete"
  | "common.export"
  | "common.filter"
  | "common.status"
  | "common.actions"
  | "common.loading"
  | "common.noResults"
  | "invoice.title"
  | "invoice.create"
  | "invoice.edit"
  | "invoice.amount"
  | "invoice.dueDate"
  | "customer.title"
  | "customer.create"
  | "payment.title"
  | "payment.transaction";

const translations: Record<Locale, Partial<Record<TranslationKey, string>>> = {
  en: {
    "nav.dashboard": "Dashboard",
    "nav.invoices": "Invoices",
    "nav.customers": "Customers",
    "nav.payments": "Payments",
    "nav.settings": "Settings",
    "common.search": "Search",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.export": "Export",
    "common.filter": "Filters",
    "common.status": "Status",
    "common.actions": "Actions",
    "common.loading": "Loading...",
    "common.noResults": "No results.",
    "invoice.title": "Invoices",
    "invoice.create": "Create Invoice",
    "invoice.edit": "Edit Invoice",
    "invoice.amount": "Amount",
    "invoice.dueDate": "Due Date",
    "customer.title": "Customers",
    "customer.create": "Add Customer",
    "payment.title": "Payments",
    "payment.transaction": "Transactions",
  },
  es: {
    "nav.dashboard": "Panel",
    "nav.invoices": "Facturas",
    "nav.customers": "Clientes",
    "nav.payments": "Pagos",
    "nav.settings": "Ajustes",
    "common.search": "Buscar",
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
    "common.delete": "Eliminar",
    "common.export": "Exportar",
    "common.filter": "Filtros",
    "common.status": "Estado",
    "common.actions": "Acciones",
    "common.loading": "Cargando...",
    "common.noResults": "Sin resultados.",
    "invoice.title": "Facturas",
    "invoice.create": "Crear Factura",
    "invoice.edit": "Editar Factura",
    "invoice.amount": "Monto",
    "invoice.dueDate": "Vencimiento",
    "customer.title": "Clientes",
    "customer.create": "Agregar Cliente",
    "payment.title": "Pagos",
    "payment.transaction": "Transacciones",
  },
  fr: {
    "nav.dashboard": "Tableau de bord",
    "nav.invoices": "Factures",
    "nav.customers": "Clients",
    "nav.payments": "Paiements",
    "nav.settings": "Paramètres",
    "common.search": "Rechercher",
    "common.save": "Enregistrer",
    "common.cancel": "Annuler",
    "common.delete": "Supprimer",
    "common.export": "Exporter",
    "common.filter": "Filtres",
    "common.status": "Statut",
    "common.actions": "Actions",
    "common.loading": "Chargement...",
    "common.noResults": "Aucun résultat.",
    "invoice.title": "Factures",
    "invoice.create": "Créer une facture",
    "invoice.edit": "Modifier la facture",
    "invoice.amount": "Montant",
    "invoice.dueDate": "Date d'échéance",
    "customer.title": "Clients",
    "customer.create": "Ajouter un client",
    "payment.title": "Paiements",
    "payment.transaction": "Transactions",
  },
  de: {
    "nav.dashboard": "Dashboard",
    "nav.invoices": "Rechnungen",
    "nav.customers": "Kunden",
    "nav.payments": "Zahlungen",
    "nav.settings": "Einstellungen",
    "common.search": "Suchen",
    "common.save": "Speichern",
    "common.cancel": "Abbrechen",
    "common.delete": "Löschen",
    "common.export": "Exportieren",
    "common.filter": "Filter",
    "common.status": "Status",
    "common.actions": "Aktionen",
    "common.loading": "Laden...",
    "common.noResults": "Keine Ergebnisse.",
    "invoice.title": "Rechnungen",
    "invoice.create": "Rechnung erstellen",
    "invoice.edit": "Rechnung bearbeiten",
    "invoice.amount": "Betrag",
    "invoice.dueDate": "Fälligkeitsdatum",
    "customer.title": "Kunden",
    "customer.create": "Kunde hinzufügen",
    "payment.title": "Zahlungen",
    "payment.transaction": "Transaktionen",
  },
  ja: {
    "nav.dashboard": "ダッシュボード",
    "nav.invoices": "請求書",
    "nav.customers": "顧客",
    "nav.payments": "支払い",
    "nav.settings": "設定",
    "common.search": "検索",
    "common.save": "保存",
    "common.cancel": "キャンセル",
    "common.delete": "削除",
    "common.export": "エクスポート",
    "common.filter": "フィルター",
    "common.status": "ステータス",
    "common.actions": "アクション",
    "common.loading": "読み込み中...",
    "common.noResults": "結果がありません。",
    "invoice.title": "請求書",
    "invoice.create": "請求書を作成",
    "invoice.edit": "請求書を編集",
    "invoice.amount": "金額",
    "invoice.dueDate": "支払期限",
    "customer.title": "顧客",
    "customer.create": "顧客を追加",
    "payment.title": "支払い",
    "payment.transaction": "取引",
  },
  zh: {
    "nav.dashboard": "仪表盘",
    "nav.invoices": "发票",
    "nav.customers": "客户",
    "nav.payments": "付款",
    "nav.settings": "设置",
    "common.search": "搜索",
    "common.save": "保存",
    "common.cancel": "取消",
    "common.delete": "删除",
    "common.export": "导出",
    "common.filter": "筛选",
    "common.status": "状态",
    "common.actions": "操作",
    "common.loading": "加载中...",
    "common.noResults": "暂无结果。",
    "invoice.title": "发票",
    "invoice.create": "创建发票",
    "invoice.edit": "编辑发票",
    "invoice.amount": "金额",
    "invoice.dueDate": "截止日期",
    "customer.title": "客户",
    "customer.create": "添加客户",
    "payment.title": "付款",
    "payment.transaction": "交易",
  },
};

const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  ja: "日本語",
  zh: "中文",
};

interface I18nState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
  localeNames: Record<Locale, string>;
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set, get) => ({
      locale: "en",
      setLocale: (locale) => set({ locale }),
      t: (key) => {
        const { locale } = get();
        return translations[locale]?.[key] || translations.en[key] || key;
      },
      localeNames,
    }),
    { name: "invoicecore-i18n" }
  )
);
