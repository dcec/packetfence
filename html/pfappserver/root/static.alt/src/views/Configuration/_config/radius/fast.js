import i18n from '@/utils/locale'
import pfFormChosen from '@/components/pfFormChosen'
import pfFormInput from '@/components/pfFormInput'
import { pfSearchConditionType as conditionType } from '@/globals/pfSearch'
import {
  attributesFromMeta,
  validatorsFromMeta
} from '../'

export const columns = [
  {
    key: 'id',
    label: 'Identifier', // i18n defer
    sortable: true,
    visible: true
  },
  {
    key: 'tls',
    label: 'TLS', // i18n defer
    sortable: true,
    visible: true
  },
  {
    key: 'buttons',
    label: '',
    locked: true
  }
]

export const fields = [
  {
    value: 'id',
    text: i18n.t('Identifier'),
    types: [conditionType.SUBSTRING]
  }
]

export const config = () => {
  return {
    columns,
    fields,
    rowClickRoute (item) {
      return { name: 'radiusFast', params: { id: item.id } }
    },
    searchPlaceholder: i18n.t('Search by identifier'),
    searchableOptions: {
      searchApiEndpoint: 'config/radiusd/fast_profiles',
      defaultSortKeys: ['id'],
      defaultSearchCondition: {
        op: 'and',
        values: [{
          op: 'or',
          values: [
            { field: 'id', op: 'contains', value: null }
          ]
        }]
      },
      defaultRoute: { name: 'radiusFasts' }
    },
    searchableQuickCondition: (quickCondition) => {
      return {
        op: 'and',
        values: [
          {
            op: 'or',
            values: [
              { field: 'id', op: 'contains', value: quickCondition }
            ]
          }
        ]
      }
    }
  }
}

export const view = (form = {}, meta = {}) => {
  return [
    {
      tab: null,
      rows: [
        {
          label: i18n.t('Identifier'),
          cols: [
            {
              namespace: 'id',
              component: pfFormInput,
              attrs: attributesFromMeta(meta, 'id')
            }
          ]
        },
        {
          label: i18n.t('TLS Profile'),
          cols: [
            {
              namespace: 'tls',
              component: pfFormChosen,
              attrs: attributesFromMeta(meta, 'root_module')
            }
          ]
        },
        {
          label: i18n.t('Authority Identity'),
          cols: [
            {
              namespace: 'authority_identity',
              component: pfFormInput,
              attrs: attributesFromMeta(meta, 'authority_identity')
            }
          ]
        },
        {
          label: i18n.t('Key'),
          cols: [
            {
              namespace: 'pac_opaque_key',
              component: pfFormInput,
              attrs: attributesFromMeta(meta, 'pac_opaque_key')
            }
          ]
        }
      ]
    }
  ]
}

export const validators = (form = {}, meta = {}) => {
  return {
    id: validatorsFromMeta(meta, 'id', i18n.t('Identifier'))
  }
}
