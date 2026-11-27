using UnityEngine;
using UnityEngine.VFX;

public class RainingScript : MonoBehaviour
{
    [SerializeField] private Material cloudMaterial;

    [SerializeField] private VisualEffect rainingVisualEffect;

    bool activated = false;
    private float rainingCounter = 0;

    void Start()
    {
        cloudMaterial.SetFloat("_isRaining", 0);
        rainingVisualEffect.SetBool("RainOn", false);
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.R))
        {
            activated = !activated;
        }

        if (activated && cloudMaterial.GetFloat("_isRaining") < 1)
        {
            cloudMaterial.SetFloat("_isRaining", Mathf.Clamp(rainingCounter += Time.deltaTime,0,1));
            Debug.Log("raining");
        }
        else if (!activated && cloudMaterial.GetFloat("_isRaining") > 0)
        {
            cloudMaterial.SetFloat("_isRaining", Mathf.Clamp(rainingCounter -= Time.deltaTime,0,1));
            Debug.Log("not raining");
        }


        if (cloudMaterial.GetFloat("_isRaining") >=1)
        {
            rainingVisualEffect.SetBool("RainOn", true);
            Debug.Log("raining going");
        }
        else if (cloudMaterial.GetFloat("_isRaining") <= 0)
        {
            rainingVisualEffect.SetBool("RainOn", false);
            Debug.Log("not raining going");
        }

    }

}
